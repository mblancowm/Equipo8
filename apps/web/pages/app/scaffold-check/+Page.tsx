import { HealthResponseSchema } from '@equipo8/contracts/v1';
import type { HealthResponse } from '@equipo8/contracts/v1';
import { useEffect, useState } from 'react';

export default function Page() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetch('/api/v1/health')
      .then(async (response) => {
        if (!response.ok) throw new Error(`API health returned HTTP ${response.status}`);
        return HealthResponseSchema.parse(await response.json());
      })
      .then((result) => {
        if (active) setHealth(result);
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : 'API health could not be read.');
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="space-y-5" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Scaffold verification</p>
      <h1 className="text-4xl font-bold tracking-tight">Nested route is available</h1>
      <p className="text-slate-300">
        API status: {health ? health.status : error ? 'unavailable' : 'checking'}
      </p>
      {error ? <p className="text-rose-300">{error}</p> : null}
      <a className="text-cyan-300 underline underline-offset-4" href="/">Back to the scaffold home</a>
    </section>
  );
}
