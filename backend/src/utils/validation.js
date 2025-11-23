const validator = require("validator");

function validateSignUp(req) {
    const { firstName, lastName, email, password, age, gender, photoUrl } =
        req.body;

    errors = [];

    if (!firstName) {
        errors.push("First name is required");
    }

    if (!lastName) {
        errors.push("Last name is required");
    }

    if (!email) {
        errors.push("Email is required");
    }

    if (!password) {
        errors.push("Password is required");
    }

    if (photoUrl && !validator.isURL(photoUrl)) {
        errors.push("Invalid photo URL");
    }

    if (!age) {
        errors.push("Age is required");
    }

    if (age && age < 18) {
        errors.push("Age must be at least 18");
    }

    if (age && age > 100) {
        errors.push("Age must be less than 120");
    }

    if (age && age % 1 !== 0) {
        errors.push("Age must be an integer");
    }

    if (!gender) {
        errors.push("Gender is required");
    }

    if (gender && !["male", "female", "other"].includes(gender)) {
        errors.push("Invalid gender");
    }

    if (email && !validator.isEmail(email)) {
        errors.push("Invalid email");
    }

    if (password && validator.isStrongPassword(password)) {
        errors.push("Password is too weak");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
}

function validateLogin(req) {
    const { email, password } = req.body;

    errors = [];

    if (!email) {
        errors.push("Email is required");
    }

    if (!password) {
        errors.push("Password is required");
    }

    if (email && !validator.isEmail(email)) {
        errors.push("Invalid email");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
}

function validateProfileEdit(req) {
    const ALLOWED_FIELDS = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "skill",
        "photoUrl",
        "about",
    ];

    const isEditAllowed = Object.keys(req.body).every((key) =>
        ALLOWED_FIELDS.includes(key)
    );

    if (!isEditAllowed) {
        throw new Error("Invalid fields");
    }

    const { firstName, lastName, age, gender, skill, photoUrl, about } =
        req.body;

    errors = [];
    if (
        !firstName &&
        !lastName &&
        !age &&
        !gender &&
        !skill &&
        !photoUrl &&
        !about
    ) {
        errors.push("At least one field is required");
    }

    if (photoUrl && !validator.isURL(photoUrl)) {
        errors.push("Invalid photo URL");
    }

    if (age && age < 18) {
        errors.push("Age must be at least 18");
    }

    if (age && age > 100) {
        errors.push("Age must be less than 120");
    }

    if (age && age % 1 !== 0) {
        errors.push("Age must be an integer");
    }

    if (skill && !Array.isArray(skill)) {
        errors.push("Skills must be an array");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
}

function validatePasswordChange(req) {
    const { oldPassword, newPassword } = req.body;

    errors = [];

    if (!oldPassword) {
        errors.push("Old password is required");
    }

    if (!newPassword) {
        errors.push("New password is required");
    }

    if (newPassword && validator.isStrongPassword(newPassword)) {
        errors.push("New password is too weak");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
}

module.exports = {
    validateSignUp,
    validateLogin,
    validateProfileEdit,
    validatePasswordChange,
};
