const express = require("express");

const router = express.Router();

const adminController =
require("../controllers/adminController");

const auth =
require("../middleware/authMiddleware");

const admin =
require("../middleware/adminMiddleware");

router.get(
    "/dashboard",
    auth,
    admin,
    adminController.getDashboardStats
);

router.get(
    "/customers",
    auth,
    admin,
    adminController.getCustomers
);

router.get(
    "/appointments",
    auth,
    admin,
    adminController.getAppointments
);

router.get(
    "/appointments/status/:status",
    auth,
    admin,
    adminController.getAppointmentsByStatus
);

router.get(
    "/revenue",
    auth,
    admin,
    adminController.getRevenue
);

router.get(
    "/monthly-revenue",
    auth,
    admin,
    adminController.getMonthlyRevenue
);

router.get(
    "/reviews",
    auth,
    admin,
    adminController.getReviewStats
);

router.put(

    "/appointments/:id",

    auth,

    admin,

    adminController.updateAppointmentStatus

);

router.delete(

    "/appointments/:id",

    auth,

    admin,

    adminController.deleteAppointment

);
module.exports = router;