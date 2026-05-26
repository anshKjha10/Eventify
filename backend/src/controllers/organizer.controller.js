const organizerModel = require('../models/organizer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerOrganizer(req, res) {
    try {
        const { name, email, password, phoneNumber, orgName, website, gstNumber } = req.body || {};

        if (!name || !email || !password || !phoneNumber || !orgName || !gstNumber) {
            return res.status(400).json({
                message: "All fields are required (name, email, password, phoneNumber, orgName, gstNumber)"
            });
        }

        const existing = await organizerModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Organizer already exists with this email!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const organizer = new organizerModel({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            orgName,
            website: website || '',
            gstNumber,
        });

        await organizer.save();

        const token = jwt.sign(
            { id: organizer._id, role: organizer.role },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);
        return res.status(201).json({
            message: "Organizer registered successfully",
            user: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                avatar: organizer.avatar,
                orgName: organizer.orgName,
                role: organizer.role,
            }
        });

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong!", error: err.message });
    }
}

async function loginOrganizer(req, res) {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const organizer = await organizerModel.findOne({ email });
        if (!organizer) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isPasswordValid = await bcrypt.compare(password, organizer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = jwt.sign(
            { id: organizer._id, role: organizer.role },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);
        return res.status(200).json({
            message: "Organizer logged in successfully",
            user: {
                _id: organizer._id,
                name: organizer.name,
                email: organizer.email,
                avatar: organizer.avatar,
                orgName: organizer.orgName,
                role: organizer.role,
            }
        });

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong!", error: err.message });
    }
}

function logoutUser(req, res) {
    res.clearCookie("token");

    return res.status(200).json({
        message: "Organizer logged out successfully"
    });
}

module.exports = { registerOrganizer, loginOrganizer, logoutUser };
