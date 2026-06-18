require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const app = express();

// DB (SQLite)
require("./db/database");

// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
}));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "HyperStudio Backend (SQLite)",
        status: "Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("==================================");
    console.log(`HyperStudio running on port ${PORT}`);
    console.log("==================================");
});
