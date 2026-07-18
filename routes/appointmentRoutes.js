const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

const authMiddleware = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const validateRequest = require("../middleware/validateRequest");

const {
    appointmentValidation
} = require("../validators/appointmentValidator");

// Available Slots (Public)
router.get(
    "/slots",
    appointmentController.getAvailableSlots
);

// Book Appointment (Customer)
router.post(
    "/",
    authMiddleware,
    appointmentValidation,
    validateRequest,
    appointmentController.bookAppointment
);

// Customer Appointments
router.get(
    "/my",
    authMiddleware,
    appointmentController.getMyAppointments
);

// Cancel Appointment
router.put(
    "/cancel/:id",
    authMiddleware,
    appointmentController.cancelAppointment
);

// Reschedule Appointment
router.put(
    "/reschedule/:id",
    authMiddleware,
    appointmentController.rescheduleAppointment
);

// Admin - View All Appointments
router.get(
    "/",
    authMiddleware,
    admin,
    appointmentController.getAllAppointments
);

// Admin - Update Appointment Status
router.put(
    "/status/:id",
    authMiddleware,
    admin,
    appointmentController.updateStatus
);


module.exports = router;