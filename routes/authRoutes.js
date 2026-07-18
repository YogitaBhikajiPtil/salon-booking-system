const express = require("express");
const router = express.Router();

const validateRequest = require("../middleware/validateRequest");

const { register, login } = require("../controllers/authController");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");

// Register
router.post(
    "/register",
    registerValidation,
    validateRequest,
    register
);

// Login
router.post(
    "/login",
    loginValidation,
    validateRequest,
    login
);

module.exports = router;