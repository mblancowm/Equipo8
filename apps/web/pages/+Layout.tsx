import type { PropsWithChildren } from 'react';
import '../src/styles.css';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        {children}
      </main>
    </div>
  );
}
