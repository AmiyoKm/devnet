const express = require("express");
const router = express.Router();

const { authentication } = require("../middlewares/auth");
const {
    validateProfileEdit,
    validatePasswordChange,
} = require("../utils/validation");
const { cleanUser } = require("../utils/cleaner");

router.get("/view", authentication, async (req, res) => {
    try {
        const user = req.user;

        res.json({
            message: `${user.firstName}, your profile view successfuly`,
            data: cleanUser(user),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/edit", authentication, async (req, res) => {
    try {
        validateProfileEdit(req);
        const loggedInUser = req.user;

        Object.keys(req.body).forEach(
            (key) => (loggedInUser[key] = req.body[key])
        );

        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfuly`,
            data: cleanUser(loggedInUser),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/password", authentication, async (req, res) => {
    try {
        validatePasswordChange(req);
        const loggedInUser = req.user;
        const { oldPassword, newPassword } = req.body;

        const isPasswordValid = await loggedInUser.validatePassword(
            oldPassword
        );

        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        loggedInUser.password = passwordHash;
        await loggedInUser.save();

        res.json({
            message: `${loggedInUser.firstName}, your password updated successfuly`,
            data: cleanUser(loggedInUser),
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
