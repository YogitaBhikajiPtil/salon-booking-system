const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/serviceController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const validateRequest = require("../middleware/validateRequest");

const {
    serviceValidation
} = require("../validators/serviceValidator");

// Create Service
router.post(
    "/",
    auth,
    admin,
    serviceValidation,
    validateRequest,
    serviceController.createService
);

// Get All Services
router.get("/", serviceController.getAllServices);

// Get Service By ID
router.get("/:id", serviceController.getServiceById);

// Update Service
router.put(
    "/:id",
    auth,
    admin,
    serviceValidation,
    validateRequest,
    serviceController.updateService
);

// Delete Service
router.delete(
    "/:id",
    auth,
    admin,
    serviceController.deleteService
);

module.exports = router;