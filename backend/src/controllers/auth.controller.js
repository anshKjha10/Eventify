const userModel = require('../models/user.model');
const organizerModel = require('../models/organizer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { uploadMulterFile } = require('../services/storage.service');

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
                avatar: user.avatar,
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

        // Check User collection first, then fall back to Organizer collection
        let account = await userModel.findOne({ email });
        let isOrganizer = false;

        if (!account) {
            account = await organizerModel.findOne({ email });
            isOrganizer = true;
        }

        if (!account) {

            return res.status(400).json({
                message: "Invalid email or password!"
            });

        }

        const isPasswordValid = await bcrypt.compare(
            password,
            account.password
        );

        if (!isPasswordValid) {

            return res.status(400).json({
                message: "Invalid email or password!"
            });

        }

        const token = jwt.sign({
            id: account._id,
            role: account.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token);

        return res.status(200).json({
            message: `${isOrganizer ? 'Organizer' : 'User'} logged in successfully`,
            user: {
                _id: account._id,
                name: account.name,
                email: account.email,
                phoneNumber: account.phoneNumber,
                avatar: account.avatar,
                ...(isOrganizer && { orgName: account.orgName }),
                role: account.role,
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

async function updateProfilePhoto(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required." });
        }

        const uploadResult = await uploadMulterFile(req.file, { folder: "avatars" });
        if (!uploadResult) {
            return res.status(500).json({ message: "Failed to upload profile image." });
        }

        const avatarPath = uploadResult.url;
        const isOrganizer = req.user.role === 'admin';
        const model = isOrganizer ? organizerModel : userModel;

        const account = await model.findByIdAndUpdate(
            req.user.id,
            { avatar: avatarPath },
            { new: true }
        );

        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }

        return res.status(200).json({
            message: "Profile photo updated successfully",
            user: {
                _id: account._id,
                name: account.name,
                email: account.email,
                phoneNumber: account.phoneNumber,
                avatar: account.avatar,
                ...(isOrganizer && { orgName: account.orgName }),
                role: account.role,
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateProfilePhoto
};