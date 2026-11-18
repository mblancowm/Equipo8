import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db, databasePath, sqlite } from './client';

try {
  migrate(db, { migrationsFolder: `${import.meta.dir}/migrations` });
  console.log(`Local SQLite migrations applied at ${databasePath}`);
} finally {
  sqlite.close();
}
