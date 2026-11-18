import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const repositoryRoot = resolve(import.meta.dir, '../../../../');
export const databasePath = resolve(
  repositoryRoot,
  Bun.env.DATABASE_PATH ?? '.local-data/learning-center.sqlite'
);

mkdirSync(dirname(databasePath), { recursive: true });

export const sqlite = new Database(databasePath, { create: true });
export const db = drizzle(sqlite);
