import {
  ApiErrorResponseSchema,
  HealthRequestSchema,
  HealthResponseSchema
} from '@equipo8/contracts/v1';
import { Hono } from 'hono';

const app = new Hono();

type ValidationIssue = {
  code: string;
  path: readonly PropertyKey[];
  message: string;
  keys?: readonly string[];
};

function toJsonPointer(segments: readonly PropertyKey[]): string {
  return segments.length === 0
    ? ''
    : `/${segments.map((segment) => String(segment).replaceAll('~', '~0').replaceAll('/', '~1')).join('/')}`;
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

export default {
  hostname: '127.0.0.1',
  port: Number(Bun.env.API_PORT ?? 3001),
  fetch: app.fetch
};
