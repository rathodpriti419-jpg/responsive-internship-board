const Database = require("better-sqlite3");

const db = new Database("internships.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    domain TEXT NOT NULL,
    location TEXT NOT NULL,
    duration TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    skills TEXT
  )
`).run();

module.exports = db;