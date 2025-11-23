const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 50,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address: " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a Strong Password: " + value);
                }
            },
        },
        age: {
            type: Number,
            min: 18,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: {
                values: ["male", "female", "other"],
                message: `{VALUE} is not a valid gender type`,
            },
        },
        photoUrl: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo URL: " + value);
                }
            },
        },
        about: {
            type: String,
            default: "No about",
        },
        skill: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.getJWT = function () {
    const user = this;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
        algorithm: "HS256",
        issuer: "devnet",
        subject: user._id.toString(),
        audience: "user",
    });

    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );

    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
