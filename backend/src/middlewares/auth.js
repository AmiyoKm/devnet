const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authentication = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ error: "Please Login!" });
        }

        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = decodedObj;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    authentication,
};
