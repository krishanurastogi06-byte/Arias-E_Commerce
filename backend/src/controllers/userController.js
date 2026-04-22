const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user-model');
const nodemailer = require('nodemailer');

const path = require('path');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your ARIA Account',
        html:
            `<div style="background-color: #f4f4f4; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                <div
                    style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                    <div style="background-color: #000000; padding: 40px; text-align: center;">
                        <img src="cid:logo" alt="ARIA Logo" style="width:150px">
                    </div>
                    <div style="padding: 40px; text-align: center;">
                        <h2 style="color: #1a1a1a; margin-bottom: 10px; font-size: 24px;">Confirm Your Email</h2>
                        <p style="color: #666666; font-size: 16px; margin-bottom: 30px;">Welcome to the family. Use the code below
                            to verify your account and start your curated experience.</p>

                        <div
                            style="display: inline-block; padding: 20px 40px; background-color: #f9f9f9; border: 2px dashed #dddddd; border-radius: 15px; margin: 20px 0;">
                            <span
                                style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #000000; display: block;">${otp}</span>
                        </div>

                        <p style="color: #999999; font-size: 13px; margin-top: 20px;">This code is valid for <b>1 minute</b> only.
                        </p>
                    </div>
                    <div style="padding: 20px; background-color: #fafafa; text-align: center; border-top: 1px solid #f0f0f0;">
                        <p style="color: #bbbbbb; font-size: 12px; margin: 0;">&copy; 2026 ARIA Clothing. All rights reserved.</p>
                        <p style="color: #bbbbbb; font-size: 12px; margin-top: 5px;">If you didn't request this, please ignore this
                            email.</p>
                    </div>
                </div>
            </div>`,
        attachments: [{
            filename: 'logo.png',
            path: path.join(__dirname, '../public/logo.png'),
            cid: 'logo'
        }]
    };

    return transporter.sendMail(mailOptions);
};

exports.registerUser = async (req, res) => {
    let { fullname, email, password, address, profileImage, role, phoneNumber } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        const createdUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            address,
            profileImage,
            role: role || "user",
            phoneNumber,
            otp,
            otpExpiry
        });

        await sendEmail(email, otp);

        const userData = createdUser.toObject();
        delete userData.password;
        delete userData.otp;

        return res.status(201).json({
            message: "User created successfully. Please verify your email with the OTP sent.",
            user: userData
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!userExist.isVerified) {
            return res.status(403).json({
                message: "Please verify your email before logging in.",
                notVerified: true
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: userExist._id, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: "4d" }
        );

        const userData = userExist.toObject();
        delete userData.password;

        return res.status(200).json({
            message: "User logged in successfully",
            user: userData,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            message: "Email verified successfully",
            user: userData,
            token
        });

    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 1 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendEmail(email, otp);

        res.status(200).json({ message: "OTP resent successfully" });

    } catch (error) {
        console.error("Resend OTP Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error("Get User Profile Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Get All Users Error:", error);
        return res.status(500).json({ message: "Unauthorize Access Not Allowed" });
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const { fullname, email, password, address, profileImage } = req.body;
        const user = await userModel.findByIdAndUpdate(req.user.id, { fullname, email, address, profileImage }, { new: true });
        res.json({
            message: "Profile updated",
            user
        });

    } catch (error) {
        console.error("Update User Profile Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}