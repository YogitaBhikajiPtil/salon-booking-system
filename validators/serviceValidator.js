const { body } = require("express-validator");

exports.serviceValidation = [

    body("serviceName")
        .notEmpty()
        .withMessage("Service name is required"),

    body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),

    body("duration")
        .isInt({ gt: 0 })
        .withMessage("Duration must be greater than 0")

];