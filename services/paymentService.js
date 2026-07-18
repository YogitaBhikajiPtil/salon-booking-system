const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const generateInvoice =
require("../utils/invoiceGenerator");

const User =
require("../models/User");

const Staff =
require("../models/Staff");

const createOrder = async (appointmentId) => {

    // Find appointment
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment)
        throw new Error("Appointment not found");

    // Get service price
    const service = await Service.findByPk(
        appointment.serviceId
    );

    if (!service)
        throw new Error("Service not found");

    const options = {

        amount: service.price * 100,

        currency: "INR",

        receipt: `receipt_${appointmentId}`

    };

    const order = await razorpay.orders.create(options);

    await Payment.create({

        appointmentId,

        razorpayOrderId: order.id,

        amount: service.price,

        currency: order.currency,

        status: "Pending"

    });

    return order;

};

const verifyPayment = async (data) => {

    const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature

    } = data;

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {

        throw new Error("Payment verification failed");

    }

    const payment = await Payment.findOne({

        where: {

            razorpayOrderId: razorpay_order_id

        }

    });

    if (!payment)
        throw new Error("Payment not found");

    payment.razorpayPaymentId =
        razorpay_payment_id;

    payment.status = "Success";

    await payment.save();

    const appointment =
await Appointment.findByPk(
    payment.appointmentId
);

const user =
await User.findByPk(
    appointment.userId
);

const service =
await Service.findByPk(
    appointment.serviceId
);

const staff =
await Staff.findByPk(
    appointment.staffId
);

const invoicePath =
await generateInvoice(

    appointment,

    payment,

    user,

    service,

    staff

);

payment.invoicePath = invoicePath;

await payment.save();

    await Appointment.update(

        {

            paymentStatus: "Paid"

        },

        {

            where: {

                id: payment.appointmentId

            }

        }

    );

    return payment;

};

module.exports = {

    createOrder,

    verifyPayment

};