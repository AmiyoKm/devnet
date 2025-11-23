function cleanUser(user) {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age,
        gender: user.gender,
        photoUrl: user.photoUrl,
        about: user.about,
        skill: user.skill,
    };
}

module.exports = {
    cleanUser,
};
