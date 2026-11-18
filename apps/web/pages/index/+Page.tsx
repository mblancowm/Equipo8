export default function Page() {
  return (
    <section className="space-y-5">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Learning Center</p>
      <h1 className="text-4xl font-bold tracking-tight">Local application scaffold</h1>
      <p className="max-w-2xl text-slate-300">
        The web, API, shared contracts, and local SQLite foundation are ready for the next stories.
      </p>
      <a className="inline-flex rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950" href="/app/scaffold-check">
        Open the scaffold check
      </a>
    </section>
  );
}
