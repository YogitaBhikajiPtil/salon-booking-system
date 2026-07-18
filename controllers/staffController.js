const staffService = require("../services/staffService");
const sendResponse = require("../utils/response");

// Create Staff
exports.createStaff = async (req, res) => {
    try {
        const staff = await staffService.createStaff(req.body);

        return sendResponse(
            res,
            201,
            true,
            "Staff created successfully",
            staff
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

// Get All Staff
exports.getAllStaff = async (req, res) => {
    try {
        const staffs = await staffService.getAllStaff();

        return sendResponse(
            res,
            200,
            true,
            "Staff fetched successfully",
            staffs
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

// Get Staff By ID
exports.getStaffById = async (req, res) => {
    try {
        const staff = await staffService.getStaffById(req.params.id);

        return sendResponse(
            res,
            200,
            true,
            "Staff fetched successfully",
            staff
        );
    } catch (error) {
        return sendResponse(
            res,
            404,
            false,
            error.message
        );
    }
};

// Update Staff
exports.updateStaff = async (req, res) => {
    try {
        const staff = await staffService.updateStaff(
            req.params.id,
            req.body
        );

        return sendResponse(
            res,
            200,
            true,
            "Staff updated successfully",
            staff
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

// Delete Staff
exports.deleteStaff = async (req, res) => {
    try {
        await staffService.deleteStaff(req.params.id);

        return sendResponse(
            res,
            200,
            true,
            "Staff deleted successfully"
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

// Assign Services
exports.assignServices = async (req, res) => {
    try {

        const { staffId, serviceIds } = req.body;

        const result = await staffService.assignServices(
            staffId,
            serviceIds
        );

        return sendResponse(
            res,
            200,
            true,
            "Services assigned successfully",
            result
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

// Add Availability
exports.addAvailability = async (req, res) => {

    try {

        const availability = await staffService.addAvailability(
            req.body
        );

        return sendResponse(
            res,
            201,
            true,
            "Availability added successfully",
            availability
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

// Get Staff Availability
exports.getAvailability = async (req, res) => {

    try {

        const availability = await staffService.getAvailability(
            req.params.staffId
        );

        return sendResponse(
            res,
            200,
            true,
            "Availability fetched successfully",
            availability
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

exports.getStaffByService = async (req, res) => {

    try {

        const staff =
            await staffService.getStaffByService(
                req.params.serviceId
            );

        return sendResponse(
            res,
            200,
            true,
            "Staff fetched successfully",
            staff
        );

    } catch (err) {

        return sendResponse(
            res,
            400,
            false,
            err.message
        );

    }

};