require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const connectDatabase = require("./config/database");

const app = express();

connectDatabase();

app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
});

app.use(limiter);

app.get("/", (req, res) => {

    res.json({

        success: true,

        name: "HyperStudio Backend",

        version: "1.0.0",

        status: "Running"

    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("");

    console.log("===================================");

    console.log(`HyperStudio running on port ${PORT}`);

    console.log("===================================");

});