const Database = require("better-sqlite3");
const db = new Database("hyperstudio.db");

// create user table
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
)
`).run();

console.log("✓ SQLite Connected & Tables Ready");

module.exports = db;
