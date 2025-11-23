const express = require("express");
const router = express.Router();

const { authentication } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connections");
const User = require("../models/user");

router.post("/send/:status/:userId", authentication, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        const allowedStatus = ["IGNORED", "INTERESTED"];
        if (!allowedStatus.includes(status)) {
            return res
                .status(400)
                .json({ error: "Invalid status type: " + status });
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ error: "User not found!" });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });
        if (existingConnectionRequest) {
            return res.status(400).json({ error: "Request Already Exists!!" });
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message:
                req.user.firstName +
                " is " +
                status +
                " in " +
                toUser.firstName,
            data,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/review/:status/:requestId", authentication, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ["ACCEPTED", "REJECTED"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ error: "Status not allowed!" });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "INTERESTED",
        });
        if (!connectionRequest) {
            return res
                .status(404)
                .json({ error: "Connection request not found" });
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({ message: "Connection request " + status, data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
