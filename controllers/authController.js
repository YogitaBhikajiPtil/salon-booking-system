const authService = require("../services/authService");
const sendResponse = require("../utils/response");


// Register User

const register = async (req, res) => {

    try {

        const user = await authService.registerUser(req.body);

        return sendResponse(
            res,
            201,
            true,
            "User registered successfully",
            user
        );

    } catch (error) {

        return sendResponse(
            res,
            400,
            false,
            error.message
        );

    }

};


// Login User

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authService.loginUser(
            email,
            password
        );

        return sendResponse(
            res,
            200,
            true,
            "Login successful",
            result
        );

    } catch (error) {

        return sendResponse(
            res,
            401,
            false,
            error.message
        );

    }

};


module.exports = {

    register,

    login

};