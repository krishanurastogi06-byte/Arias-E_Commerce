const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch((err) => {
        console.log("Error in connecting to MongoDB", err.message);
        // console.log("ENV VALUE:", process.env.MONGODB_URL);
    });

module.exports = mongoose.connection;