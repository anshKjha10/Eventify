const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { name, email, password, phoneNumber } = req.body || {};

        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role: "user"
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });

    } catch (err) {

        return res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });

    }
}

async function loginUser(req, res) {

    try {

        const { email, password } = req.body || {};

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and password are required"
            });

        }

        const user = await userModel.findOne({
            email
        });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email or password!"
            });

        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {

            return res.status(400).json({
                message: "Invalid email or password!"
            });

        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
            }
        });

    } catch (err) {

        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });

    }
}

function logoutUser(req, res) {

    res.clearCookie("token");

    return res.status(200).json({
        message: "User logged out successfully"
    });

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};