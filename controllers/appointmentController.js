const appointmentService = require("../services/appointmentService");
const sendResponse = require("../utils/response");

// Get Available Slots
exports.getAvailableSlots = async (req, res) => {
    try {

        const { serviceId, staffId, appointmentDate } = req.query;

        const slots = await appointmentService.getAvailableSlots(
            serviceId,
           staffId,
            appointmentDate
        );

        return sendResponse(
            res,
            200,
            true,
            "Available slots fetched successfully",
            slots
        );

    } catch (error) {
 console.log(error);
        return sendResponse(
            res,
            400,
            false,
            error.message
        );

    }
};

// Book Appointment
exports.bookAppointment = async (req, res) => {

    try {

        const appointment = await appointmentService.bookAppointment({
            userId: req.user.id,
            ...req.body
        });

        return sendResponse(
            res,
            201,
            true,
            "Appointment booked successfully",
            appointment
        );

    } catch (error) {

        return sendResponse(
            res,
            400,
            false,
            error.message
        );

    }

};

// Customer Appointments
exports.getMyAppointments = async (req, res) => {

    try {

        const appointments =
            await appointmentService.getMyAppointments(req.user.id);

        return sendResponse(
            res,
            200,
            true,
            "Appointments fetched successfully",
            appointments
        );

    } catch (error) {

        return sendResponse(
            res,
            500,
            false,
            error.message
        );

    }

};

// Admin - Get All Appointments
exports.getAllAppointments = async (req, res) => {

    try {

        const appointments =
            await appointmentService.getAllAppointments();

        return sendResponse(
            res,
            200,
            true,
            "Appointments fetched successfully",
            appointments
        );

    } catch (error) {

        return sendResponse(
            res,
            500,
            false,
            error.message
        );

    }

};

exports.cancelAppointment=async(req,res)=>{

    try{

        const appointment=
        await appointmentService.cancelAppointment(
            req.params.id,
            req.user.id
        );

        return sendResponse(
            res,
            200,
            true,
            "Appointment cancelled successfully",
            appointment
        );

    }catch(err){

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};

exports.rescheduleAppointment=async(req,res)=>{

    try{

        const appointment=
        await appointmentService.rescheduleAppointment(
            req.params.id,
            req.body.appointmentDate,
            req.body.startTime
        );

        return sendResponse(
            res,
            200,
            true,
            "Appointment rescheduled successfully",
            appointment
        );

    }catch(err){

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};

exports.updateStatus=async(req,res)=>{

    try{

        const appointment=
        await appointmentService.updateStatus(
            req.params.id,
            req.body.status
        );

        return sendResponse(
            res,
            200,
            true,
            "Status updated successfully",
            appointment
        );

    }catch(err){

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};

