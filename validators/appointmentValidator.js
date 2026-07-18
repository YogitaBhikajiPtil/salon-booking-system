const { body } = require("express-validator");

exports.appointmentValidation = [

    body("serviceId")
        .isInt()
        .withMessage("Valid serviceId is required"),

  
    body("appointmentDate")
        .isDate()
        .withMessage("Invalid appointment date"),

    body("startTime")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Invalid time format (HH:mm)")

];