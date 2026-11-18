import { Database } from 'bun:sqlite';

const db = new Database(':memory:');

try {
  db.exec('CREATE VIRTUAL TABLE fts5_smoke USING fts5(content, tokenize = unicode61)');
  db.query('INSERT INTO fts5_smoke (content) VALUES (?)').run('synthetic learning center');
  const match = db.query('SELECT content FROM fts5_smoke WHERE fts5_smoke MATCH ?').get('learning') as
    | { content: string }
    | null;

  if (match?.content !== 'synthetic learning center') {
    throw new Error('FTS5 did not return the inserted smoke-check row.');
  }

  console.log(`FTS5 smoke check passed: ${process.platform}/${process.arch}, Bun ${Bun.version}`);
} finally {
  db.exec('DROP TABLE IF EXISTS fts5_smoke');
  db.close();
}
