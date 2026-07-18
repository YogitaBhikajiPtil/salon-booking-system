const { body } = require("express-validator");

exports.reviewValidation = [

    body("appointmentId")
        .isInt()
        .withMessage("Appointment ID is required"),

    body("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("review")
        .notEmpty()
        .withMessage("Review is required")

];