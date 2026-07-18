const { Op } = require("sequelize");
const sequelize = require("../config/db");

const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const Staff = require("../models/Staff");
const StaffAvailability = require("../models/StaffAvailability");
const User = require("../models/User");
const StaffService = require("../models/StaffService");

const sendEmail = require("./emailService");
const {
    bookingTemplate,
    cancelTemplate,
    rescheduleTemplate
} = require("../utils/emailTemplates");
// Get Available Slots
const getAvailableSlots = async (serviceId, staffId, appointmentDate) => {

    const service = await Service.findByPk(serviceId);

    if (!service)
        throw new Error("Service not found");

    // Check if selected staff provides this service
    const staffService = await StaffService.findOne({
        where: {
            serviceId,
            staffId
        }
    });

    if (!staffService)
        throw new Error("Selected staff does not provide this service");

    const day = new Date(appointmentDate).toLocaleDateString("en-US", {
        weekday: "long"
    });

    const availability = await StaffAvailability.findOne({
        where: {
            staffId,
            day
        }
    });

    if (!availability)
        return [];

    const slots = [];

    let current = availability.startTime.slice(0, 5);
    const end = availability.endTime.slice(0, 5);

    while (current < end) {

        let [hour, minute] = current.split(":").map(Number);

        let total = hour * 60 + minute + service.duration;

        let endHour = Math.floor(total / 60);
        let endMinute = total % 60;

        const slotEnd =
            String(endHour).padStart(2, "0") +
            ":" +
            String(endMinute).padStart(2, "0");

        if (slotEnd > end)
            break;

        const overlap = await Appointment.findOne({
            where: {
                staffId,
                appointmentDate,
                [Op.and]: [
                    {
                        startTime: {
                            [Op.lt]: slotEnd
                        }
                    },
                    {
                        endTime: {
                            [Op.gt]: current
                        }
                    }
                ]
            }
        });

        if (!overlap) {

            slots.push({
                startTime: current,
                endTime: slotEnd
            });

        }

        current = slotEnd;
    }

    return slots;
};

const findAvailableStaff = async (
    serviceId,
    appointmentDate,
    startTime,
    endTime
) => {

    const day = new Date(appointmentDate).toLocaleDateString(
        "en-US",
        {
            weekday: "long"
        }
    );

    // Staff who provide this service
    const staffServices = await StaffService.findAll({
        where: {
            serviceId
        }
    });

    for (const item of staffServices) {

        // Check working hours
        const availability =
            await StaffAvailability.findOne({

                where: {
                    staffId: item.staffId,
                    day
                }

            });

        if (!availability)
            continue;

        if (
            startTime < availability.startTime ||
            endTime > availability.endTime
        ) {
            continue;
        }

        // Check overlapping appointments
        const overlapping =
            await Appointment.findOne({

                where: {

                    staffId: item.staffId,

                    appointmentDate,

                    [Op.and]: [

                        {
                            startTime: {
                                [Op.lt]: endTime
                            }
                        },

                        {
                            endTime: {
                                [Op.gt]: startTime
                            }
                        }

                    ]

                }

            });

        if (!overlapping) {

            return await Staff.findByPk(item.staffId);

        }

    }

    return null;

};

// Book Appointment
const bookAppointment = async (data) => {

    const transaction = await sequelize.transaction();

    try {

        // ==========================
        // Check User
        // ==========================

        const user = await User.findByPk(data.userId);

        if (!user)
            throw new Error("User not found");

        // ==========================
        // Check Service
        // ==========================

        const service = await Service.findByPk(data.serviceId);

        if (!service)
            throw new Error("Service not found");

        // ==========================
        // Calculate End Time
        // ==========================

        let [hour, minute] =
            data.startTime.split(":").map(Number);

        let total =
            hour * 60 +
            minute +
            service.duration;

        let endHour = Math.floor(total / 60);

        let endMinute = total % 60;

        const endTime =
            String(endHour).padStart(2, "0")
            + ":"
            + String(endMinute).padStart(2, "0");


const staff = await Staff.findByPk(data.staffId);

if (!staff) {
    throw new Error("Staff not found");
}

if (!staff) {

    throw new Error(
        "No staff available for selected slot"
    );

}            
        // ==========================
        // Overlapping Validation
        // ==========================

        const overlapping =
            await Appointment.findOne({

                where: {

                    staffId: data.staffId,

                    appointmentDate:
                        data.appointmentDate,

                    [Op.and]: [

                        {
                            startTime: {
                                [Op.lt]: endTime
                            }
                        },

                        {
                            endTime: {
                                [Op.gt]: data.startTime
                            }
                        }

                    ]

                }

            });

        if (overlapping)
            throw new Error(
                "Selected slot overlaps an existing appointment"
            );

        // ==========================
        // Create Appointment
        // ==========================

        const appointment =
            await Appointment.create({

                userId: data.userId,

                serviceId: data.serviceId,

                staffId: staff.id,

                appointmentDate:
                    data.appointmentDate,

                startTime: data.startTime,

                endTime,

                notes: data.notes,

                status: "Pending",

                paymentStatus: "Pending"

            }, { transaction });

        // ==========================
        // Send Email
        // ==========================

        await sendEmail(

            user.email,

            "Appointment Confirmed",

            bookingTemplate(

                user.name,

                service.serviceName,

                staff.name,

                data.appointmentDate,

                data.startTime

            )

        );

        await transaction.commit();

        return appointment;

    } catch (err) {

        await transaction.rollback();

        throw err;

    }

};


// Customer Appointments
const getMyAppointments = async (userId) => {

    return await Appointment.findAll({

        where: {
            userId
        },

        include: [
            Service,
            Staff
        ]

    });

};

// Admin Appointments
const getAllAppointments = async () => {

    return await Appointment.findAll({

        include: [
            User,
            Service,
            Staff
        ]

    });

};

const cancelAppointment = async (appointmentId, userId) => {

    const appointment = await Appointment.findByPk(appointmentId, {
        include: [User, Service]
    });

    if (!appointment)
        throw new Error("Appointment not found");

    if (appointment.userId !== userId)
        throw new Error("Unauthorized");

    appointment.status = "Cancelled";
    await appointment.save();

    // FIXED: use included data
    const user = appointment.User;
    const service = appointment.Service;

    if (user && service) {
        await sendEmail(
            user.email,
            "Appointment Cancelled",
            cancelTemplate(user.name, service.serviceName)
        );
    }

    return appointment;
};

const rescheduleAppointment = async (
    appointmentId,
    appointmentDate,
    startTime
) => {

    const appointment = await Appointment.findByPk(appointmentId, {
        include: [Service]
    });

    if (!appointment)
        throw new Error("Appointment not found");

    const service = appointment.Service; // FIXED

    if (!service)
        throw new Error("Service not found");

    let [hour, minute] = startTime.split(":").map(Number);

    let total = hour * 60 + minute + service.duration;

    let endHour = Math.floor(total / 60);
    let endMinute = total % 60;

    appointment.appointmentDate = appointmentDate;
    appointment.startTime = startTime;

    appointment.endTime =
        String(endHour).padStart(2, "0") +
        ":" +
        String(endMinute).padStart(2, "0");

    appointment.status = "Rescheduled";

    await appointment.save();

    return appointment;
};

const updateStatus = async (id,status)=>{

    const appointment=await Appointment.findByPk(id);

    if(!appointment)
        throw new Error("Appointment not found");

    appointment.status=status;

    await appointment.save();

    return appointment;

};

module.exports={
    getAvailableSlots,
    bookAppointment,
    getMyAppointments,
    getAllAppointments,
    cancelAppointment,
    rescheduleAppointment,
    updateStatus
};


