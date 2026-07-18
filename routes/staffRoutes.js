const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staffController");

const authMiddleware = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const validateRequest = require("../middleware/validateRequest");

const {
    staffValidation
} = require("../validators/staffValidator");

// Create Staff
router.post(
    "/",
    authMiddleware,
    admin,
    staffValidation,
    validateRequest,
    staffController.createStaff
);

// Get All Staff
router.get("/", staffController.getAllStaff);
router.get(
    "/service/:serviceId",
    staffController.getStaffByService
);

// Get Staff By ID
router.get("/:id", staffController.getStaffById);



// Update Staff
router.put(
    "/:id",
    authMiddleware,
    admin,
    staffValidation,
    validateRequest,
    staffController.updateStaff
);

// Delete Staff
router.delete(
    "/:id",
    authMiddleware,
    admin,
    staffController.deleteStaff
);

// Assign Services
router.post(
    "/assign-services",
    authMiddleware,
    admin,
    staffController.assignServices
);

// Add Availability
router.post(
    "/availability",
    authMiddleware,
    admin,
    staffController.addAvailability
);

// Get Availability
router.get(
    "/availability/:staffId",
    staffController.getAvailability
);

module.exports = router;