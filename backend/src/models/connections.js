const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: [
                    "IGNORED",
                    "INTERESTED",
                    "ACCEPTED",
                    "REJECTED",
                    "PENDING",
                ],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    { timestamps: true }
);

connectionSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionSchema.pre("save", function (next) {
    const connection = this;
    if (connection.fromUserId.equals(connection.toUserId)) {
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
});

const ConnectionModel = new mongoose.model("Connection", connectionSchema);

module.exports = ConnectionModel;
