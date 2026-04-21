const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user-model');

exports.registerUser = async (req, res) => {
    let { fullname, email, password, address, profileImage, role } = req.body;

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

        const createdUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            address,
            profileImage,
            role: role || "user"
        });

        const token = jwt.sign(
            { id: createdUser._id, role: createdUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const userData = createdUser.toObject();
        delete userData.password;

        return res.status(201).json({
            message: "User created successfully",
            user: userData,
            token
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

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: userExist._id, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
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