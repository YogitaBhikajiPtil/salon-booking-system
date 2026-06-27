const profileService = require("../services/profileService");
const sendResponse = require("../utils/response");

const getProfile = async (req, res) => {
    try {

        const user = await profileService.getProfile(req.user.id);

        return sendResponse(
            res,
            200,
            true,
            "Profile fetched successfully",
            user
        );

    } catch (err) {

        return sendResponse(
            res,
            404,
            false,
            err.message
        );

    }
};

const updateProfile = async (req, res) => {

    try {

        const user = await profileService.updateProfile(
            req.user.id,
            req.body
        );

        return sendResponse(
            res,
            200,
            true,
            "Profile updated successfully",
            user
        );

    } catch (err) {

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};

const changePassword = async (req, res) => {

    try {

        await profileService.changePassword(
            req.user.id,
            req.body.oldPassword,
            req.body.newPassword
        );

        return sendResponse(
            res,
            200,
            true,
            "Password changed successfully"
        );

    } catch (err) {

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};