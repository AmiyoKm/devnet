const express = require("express");
const { validateSignUp, validateLogin } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();
router.post("/signup", async (req, res) => {
    try {
        validateSignUp(req);

        const {
            firstName,
            lastName,
            email,
            password,
            age,
            gender,
            photoUrl,
            about,
            skill,
        } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            age,
            gender,
            photoUrl,
            about,
            skill,
            password: passwordHash,
        });

        const savedUser = await user.save();
        const token = await savedUser.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: "/",
        });

        res.json({ message: "User Added successfully!", data: savedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        validateLogin(req);
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ error: "User not found!" });
            return;
        }
        const isPasswordValid = await user.validatePassword(password);

        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = await user.getJWT();

        res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: "/",
        });

        res.json({ message: "Login successful!", data: user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.json({ message: "Logout Successful!!" });
});

module.exports = router;
