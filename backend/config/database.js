const sqlite3 = require("sqlite3").verbose();
const path = require("path");

let db;

function connectDatabase() {
    return new Promise((resolve, reject) => {
        const dbPath = path.join(__dirname, "..", "database.sqlite");

        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("❌ Failed to connect to SQLite:", err.message);
                return reject(err);
            }

            console.log("==================================");
            console.log("✓ SQLite Connected Successfully");
            console.log("==================================");

            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);

            resolve(db);
        });
    });
}

function getDatabase() {
    return db;
}

module.exports = {
    connectDatabase,
    getDatabase
};