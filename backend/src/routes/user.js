const express = require("express");
const router = express.Router();

const { authentication } = require("../middlewares/auth");
const Connection = require("../models/connections");
const User = require("../models/user");

const USER_SAFE_DATA = [
    "firstName",
    "lastName",
    "photoUrl",
    "age",
    "gender",
    "about",
    "skill",
];

router.get("/connections/interested", authentication, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await Connection.find({
            toUserId: loggedInUser._id,
            status: "INTERESTED",
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .sort({ updatedAt: -1 });

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/connections/accepted", authentication, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await Connection.find({
            $or: [
                { toUserId: loggedInUser._id, status: "ACCEPTED" },
                { fromUserId: loggedInUser._id, status: "ACCEPTED" },
            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)
            .sort({ updatedAt: -1 });

        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({ message: "Data fetched successfully", data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/feed", authentication, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connections = await Connection.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ],
        })
            .select("fromUserId  toUserId")
            .sort({ createdAt: -1 });

        const hideUsersFromFeed = new Set();
        connections.forEach((conn) => {
            hideUsersFromFeed.add(conn.fromUserId.toString());
            hideUsersFromFeed.add(conn.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.json({ message: "Data fetched successfully", data: users });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
module.exports = router;
