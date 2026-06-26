const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");

const {
     createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    assignService

} = require("../controllers/staffController");


// GET

router.get(
    "/",
    getAllStaff
);

router.get(
    "/:id",
    getStaffById
);


// ADMIN

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createStaff
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateStaff
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteStaff
);

router.post(
    "/assign-service",
    authMiddleware,
    adminMiddleware,
    assignService
);

module.exports = router;