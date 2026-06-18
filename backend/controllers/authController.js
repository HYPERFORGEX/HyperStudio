const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { username, password } = req.body;

    try {
        const user = User.createUser(username, password);
        res.json({ success: true, user });
    } catch (err) {
        res.status(400).json({ success: false, message: "User exists" });
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = User.findByUsername(username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        "SECRET_KEY",
        { expiresIn: "7d" }
    );

    res.json({ success: true, token });
};
