const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getProfile = async (id) => {

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password"]
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const updateProfile = async (id, data) => {

    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("User not found");
    }

    await user.update({
        name: data.name,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        preferences: data.preferences
    });

    return user;
};

const changePassword = async (
    id,
    oldPassword,
    newPassword
) => {

    const user = await User.findByPk(id);

    const match = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!match) {
        throw new Error("Old password is incorrect");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;

    await user.save();
};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};