const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    label: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);