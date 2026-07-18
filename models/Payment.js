const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = require("./Appointment");

const Payment = sequelize.define("Payment", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    razorpayOrderId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    razorpayPaymentId: {
        type: DataTypes.STRING
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    currency: {
        type: DataTypes.STRING,
        defaultValue: "INR"
    },

    invoicePath: {

    type: DataTypes.STRING

},

    status: {
        type: DataTypes.ENUM(
            "Pending",
            "Success",
            "Failed"
        ),
        defaultValue: "Pending"
    }

});

Appointment.hasOne(Payment, {
    foreignKey: "appointmentId"
});

Payment.belongsTo(Appointment, {
    foreignKey: "appointmentId"
});

module.exports = Payment;