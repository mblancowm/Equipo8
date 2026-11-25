import {
  ApiErrorResponseSchema,
  LocalLoginRequestSchema,
  LocalSessionResponseSchema,
  type LocalSessionResponse
} from '@equipo8/contracts/v1';
import { useEffect, useState, type FormEvent } from 'react';

async function readErrorMessage(response: Response): Promise<string> {
  const body: unknown = await response.json().catch(() => null);
  const error = ApiErrorResponseSchema.safeParse(body);
  return error.success ? error.data.detail : 'The request could not be completed.';
}

export default function Page() {
  const [session, setSession] = useState<LocalSessionResponse | null>(null);
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('');
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch('/api/v1/auth/session', { credentials: 'same-origin' })
      .then(async (response) => {
        if (response.status === 401) return null;
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return LocalSessionResponseSchema.parse(await response.json());
      })
      .then((result) => {
        if (active) setSession(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'Local sign-in is unavailable.');
        }
      })
      .finally(() => {
        if (active) setIsCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const request = LocalLoginRequestSchema.safeParse({ username, password });
    if (!request.success) {
      setError('Enter your username and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(request.data)
      });
      if (!response.ok) throw new Error(await readErrorMessage(response));

      setSession(LocalSessionResponseSchema.parse(await response.json()));
      setPassword('');
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    setError(null);
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
      if (!response.ok) throw new Error(await readErrorMessage(response));
      setSession(null);
    } catch (reason: unknown) {
      setError(reason instanceof Error ? reason.message : 'Sign-out failed.');
    }
  }

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Learning Center · local demo
        </p>

        {session ? (
          <div className="mt-7 space-y-6" aria-live="polite">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">Sesión iniciada / Signed in</h1>
              <p className="text-slate-300">
                Cuenta local: <strong className="text-white">{session.username}</strong>
              </p>
              <p className="text-sm text-slate-400">
                Cuenta sintética de desarrollo. No está vinculada a una identidad ni a registros reales.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                className="inline-flex rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                href="/app/scaffold-check"
              >
                Revisar la app / Check the app
              </a>
              <button
                className="rounded-lg border border-white/15 px-4 py-2 font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-wait disabled:opacity-60"
                disabled={isSubmitting}
                onClick={handleLogout}
                type="button"
              >
                Salir / Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-7 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión / Sign in</h1>
              <p className="text-slate-300">
                Entrá con la cuenta sintética de desarrollo. Usá solo datos de prueba.
              </p>
            </div>

            {isCheckingSession ? (
              <p className="text-sm text-slate-400" role="status">
                Revisando sesión local / Checking local session…
              </p>
            ) : null}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block space-y-2">
                <span className="text-sm font-medium">Usuario / Username</span>
                <input
                  autoComplete="username"
                  className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                  required
                  value={username}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium">Contraseña / Password</span>
                <input
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>

              {error ? (
                <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                className="w-full rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:cursor-wait disabled:opacity-60"
                disabled={isSubmitting || isCheckingSession}
                type="submit"
              >
                {isSubmitting ? 'Entrando… / Signing in…' : 'Ingresar / Sign in'}
              </button>
            </form>

            {!isCheckingSession && !error ? (
              <p className="text-xs text-slate-500">
                Acceso temporal solo para desarrollo local / Temporary local development access only.
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
