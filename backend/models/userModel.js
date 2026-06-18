const db = require("../db/database");
const bcrypt = require("bcryptjs");

const User = {
    createUser: (username, password) => {
        const hash = bcrypt.hashSync(password, 10);
        const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        return stmt.run(username, hash);
    },

    findByUsername: (username) => {
        const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
        return stmt.get(username);
    }
};

module.exports = User;
