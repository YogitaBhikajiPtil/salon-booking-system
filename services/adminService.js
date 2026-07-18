const { Op, fn, col } = require("sequelize");

const User = require("../models/User");
const Staff = require("../models/Staff");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");
const Review = require("../models/Review");

const getDashboardStats = async () => {

    const totalCustomers = await User.count({

        where: {
            role: "customer"
        }

    });

    const totalStaff =
        await Staff.count();

    const totalServices =
        await Service.count();

    const totalAppointments =
        await Appointment.count();

    const completedAppointments =
        await Appointment.count({

            where: {
                status: "Completed"
            }

        });

    const pendingAppointments =
        await Appointment.count({

            where: {
                status: "Pending"
            }

        });

    const cancelledAppointments =
        await Appointment.count({

            where: {
                status: "Cancelled"
            }

        });

        return {
        totalCustomers,
        totalStaff,
        totalServices,
        totalAppointments,
        completedAppointments,
        pendingAppointments,
        cancelledAppointments
    };

};

const getRevenue = async () => {

    const revenue =
        await Payment.findOne({

            attributes:[
                [
                    fn("SUM",col("amount")),
                    "totalRevenue"
                ]
            ],

            where:{
                status:"Success"
            }

        });

    return revenue;

};

const getMonthlyRevenue = async () => {

    return await Payment.findAll({

        attributes:[

            [
                fn("MONTH",col("createdAt")),
                "month"
            ],

            [
                fn("SUM",col("amount")),
                "revenue"
            ]

        ],

        where:{
            status:"Success"
        },

        group:[
            fn("MONTH",col("createdAt"))
        ]

    });

};

const getCustomers = async () => {

    return await User.findAll({

        where:{
            role:"customer"
        },

        attributes:{
            exclude:["password"]
        }

    });

};

const getAppointments = async () => {

    return await Appointment.findAll({

        include:[

            User,

            Staff,

            Service

        ],

        order:[
            ["appointmentDate","DESC"]
        ]

    });

};

const getAppointmentsByStatus =
async(status)=>{

    return await Appointment.findAll({

        where:{
            status
        },

        include:[

            User,

            Staff,

            Service

        ]

    });

};

const getReviewStats = async()=>{

    const result =
    await Review.findOne({

        attributes:[

            [
                fn("AVG",col("rating")),
                "averageRating"
            ],

            [
                fn("COUNT",col("id")),
                "totalReviews"
            ]

        ]

    });

    return result;

};



const updateAppointmentStatus = async (id, status) => {

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    appointment.status = status;

    await appointment.save();

    return appointment;

};
const deleteAppointment = async (id) => {

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    await appointment.destroy();

    return true;

};

module.exports={

    getDashboardStats,

    getRevenue,

    getMonthlyRevenue,

    getCustomers,

    getAppointments,

    getAppointmentsByStatus,

    getReviewStats,
    updateAppointmentStatus,
    deleteAppointment

};