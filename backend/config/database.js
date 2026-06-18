const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("==================================");
        console.log("✓ MongoDB Connected Successfully");
        console.log("==================================");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDatabase;
