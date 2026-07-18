const express = require("express");

const router = express.Router();

const paymentController = require("../controllers/paymentController");

const auth = require("../middleware/authMiddleware");

router.post(

    "/create-order/:appointmentId",

    auth,

    paymentController.createOrder

);

router.post(

    "/verify",

    auth,

    paymentController.verifyPayment

);

router.get(

"/invoice/:appointmentId",

auth,

paymentController.downloadInvoice

);

module.exports = router;