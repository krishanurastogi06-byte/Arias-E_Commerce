const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    cart: {
        type: Array,
        default: [],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    orders: {
        type: Array,
        default: [],
    },
    address: {
        street: String,
        area: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
    },
    profileImage: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: Number,
        default: 0,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpiry: {
        type: Date,
        default: null,
    },
}, { timestamps: true },);

module.exports = mongoose.model('User', userSchema);