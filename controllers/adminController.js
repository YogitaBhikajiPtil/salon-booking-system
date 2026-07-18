const adminService = require("../services/adminService");

exports.getDashboardStats = async (req, res) => {

    try {

        const stats = await adminService.getDashboardStats();

        res.status(200).json({
            success: true,
            stats
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getRevenue = async (req, res) => {

    try {

        const revenue = await adminService.getRevenue();

        res.status(200).json({
            success: true,
            revenue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getMonthlyRevenue = async (req, res) => {

    try {

        const revenue = await adminService.getMonthlyRevenue();

        res.status(200).json({
            success: true,
            revenue
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getCustomers = async (req, res) => {

    try {

        const customers = await adminService.getCustomers();

        res.status(200).json({
            success: true,
            customers
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAppointments = async (req, res) => {

    try {

        const appointments = await adminService.getAppointments();

        res.status(200).json({
            success: true,
            appointments
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getAppointmentsByStatus = async (req, res) => {

    try {

        const appointments =
            await adminService.getAppointmentsByStatus(
                req.params.status
            );

        res.status(200).json({
            success: true,
            appointments
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getReviewStats = async (req, res) => {

    try {

        const reviews = await adminService.getReviewStats();

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateAppointmentStatus = async (req, res) => {

    try {

        const appointment =
            await adminService.updateAppointmentStatus(

                req.params.id,

                req.body.status

            );

        res.json({

            success: true,

            message: "Appointment updated successfully",

            appointment

        });

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

};

exports.deleteAppointment = async (req, res) => {

    try {

        await adminService.deleteAppointment(

            req.params.id

        );

        res.json({

            success: true,

            message: "Appointment deleted successfully"

        });

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

};