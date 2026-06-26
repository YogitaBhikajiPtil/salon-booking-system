const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require("../controllers/serviceController");


// PUBLIC

router.get("/", getAllServices);

router.get("/:id", getServiceById);


// ADMIN

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createService
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateService
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteService
);

module.exports = router;