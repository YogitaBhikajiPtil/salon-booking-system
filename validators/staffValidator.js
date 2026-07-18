const { body } = require("express-validator");

exports.staffValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be 10 digits"),

    body("specialization")
        .notEmpty()
        .withMessage("Specialization is required")

];