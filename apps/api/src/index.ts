import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import {
  ApiErrorResponseSchema,
  HealthRequestSchema,
  HealthResponseSchema,
  LocalLoginRequestSchema,
  LocalLogoutResponseSchema,
  LocalSessionResponseSchema
} from '@equipo8/contracts/v1';
import { Hono, type Context } from 'hono';

const app = new Hono();
const localSessionCookie = 'learning_center_local_session';
const localSessionLifetimeSeconds = 60 * 60 * 8;
const localAuthEnabled =
  Bun.env.NODE_ENV !== 'production' && Bun.env.LEARNING_CENTER_LOCAL_AUTH_ENABLED === 'true';

type LocalSession = {
  username: string;
  expiresAt: number;
};

type ValidationIssue = {
  code: string;
  path: readonly PropertyKey[];
  message: string;
  keys?: readonly string[];
};

const localSessions = new Map<string, LocalSession>();

function toJsonPointer(segments: readonly PropertyKey[]): string {
  return segments.length === 0
    ? ''
    : '/' + segments.map((segment) => String(segment).replaceAll('~', '~0').replaceAll('/', '~1')).join('/');
}

function toFieldErrors(issues: readonly ValidationIssue[]): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of issues) {
    const paths =
      issue.code === 'unrecognized_keys' && issue.keys
        ? issue.keys.map((key) => toJsonPointer([...issue.path, key]))
        : [toJsonPointer(issue.path)];

    for (const path of paths) {
      (fieldErrors[path] ??= []).push(issue.message);
    }
  }

  return fieldErrors;
}

function apiError(
  context: Context,
  detail: string,
  status: 400 | 401 | 404 | 503,
  fieldErrors: Record<string, string[]> = {}
) {
  context.header('Cache-Control', 'no-store');
  return context.json(
    ApiErrorResponseSchema.parse({ detail, field_errors: fieldErrors }),
    status
  );
}

function constantTimeMatches(candidate: string, expected: string): boolean {
  const candidateHash = createHash('sha256').update(candidate).digest();
  const expectedHash = createHash('sha256').update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

function readLocalSession(context: Context): { token: string; session: LocalSession } | null {
  const cookieHeader = context.req.header('Cookie') ?? '';
  const cookie = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(localSessionCookie + '='));
  const token = cookie?.slice(localSessionCookie.length + 1);

  if (!token) return null;

  const session = localSessions.get(token);
  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    localSessions.delete(token);
    return null;
  }

  return { token, session };
}

function clearLocalSessionCookie(context: Context): void {
  context.header(
    'Set-Cookie',
    localSessionCookie + '=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
  );
}

app.get('/api/v1/health', (context) => {
  const query = Object.fromEntries(new URL(context.req.url).searchParams.entries());
  const request = HealthRequestSchema.safeParse(query);

  if (!request.success) {
    const response = ApiErrorResponseSchema.parse({
      detail: 'Invalid request.',
      field_errors: toFieldErrors(request.error.issues)
    });
    return context.json(response, 400);
  }

  const response = HealthResponseSchema.parse({ status: 'ok' });
  return context.json(response, 200);
});

app.post('/api/v1/auth/login', async (context) => {
  context.header('Cache-Control', 'no-store');

  if (!localAuthEnabled) {
    return apiError(context, 'Local sign-in is disabled.', 404);
  }

  const expectedUsername = Bun.env.LEARNING_CENTER_LOCAL_USERNAME ?? 'demo';
  const expectedPassword = Bun.env.LEARNING_CENTER_LOCAL_PASSWORD;

  if (!expectedPassword) {
    return apiError(context, 'Local sign-in is not configured.', 503);
  }

  let body: unknown;
  try {
    body = await context.req.json();
  } catch {
    return apiError(context, 'Invalid login request.', 400);
  }

  const request = LocalLoginRequestSchema.safeParse(body);
  if (!request.success) {
    return apiError(context, 'Invalid login request.', 400, toFieldErrors(request.error.issues));
  }

  if (
    !constantTimeMatches(request.data.username, expectedUsername) ||
    !constantTimeMatches(request.data.password, expectedPassword)
  ) {
    return apiError(context, 'Username or password is incorrect.', 401);
  }

  const token = randomBytes(32).toString('hex');
  localSessions.set(token, {
    username: expectedUsername,
    expiresAt: Date.now() + localSessionLifetimeSeconds * 1000
  });

  context.header(
    'Set-Cookie',
    localSessionCookie +
      '=' +
      token +
      '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' +
      localSessionLifetimeSeconds
  );

  const response = LocalSessionResponseSchema.parse({
    authenticated: true,
    username: expectedUsername
  });
  return context.json(response, 200);
});

app.get('/api/v1/auth/session', (context) => {
  context.header('Cache-Control', 'no-store');

  if (!localAuthEnabled) {
    return apiError(context, 'Local sign-in is disabled.', 404);
  }

  const result = readLocalSession(context);
  if (!result) {
    clearLocalSessionCookie(context);
    return apiError(context, 'Sign-in required.', 401);
  }

  const response = LocalSessionResponseSchema.parse({
    authenticated: true,
    username: result.session.username
  });
  return context.json(response, 200);
});

app.post('/api/v1/auth/logout', (context) => {
  context.header('Cache-Control', 'no-store');

  if (!localAuthEnabled) {
    return apiError(context, 'Local sign-in is disabled.', 404);
  }

  const result = readLocalSession(context);
  if (result) localSessions.delete(result.token);
  clearLocalSessionCookie(context);

  const response = LocalLogoutResponseSchema.parse({ authenticated: false });
  return context.json(response, 200);
});

export default {
  hostname: '127.0.0.1',
  port: Number(Bun.env.API_PORT ?? 3001),
  fetch: app.fetch
};