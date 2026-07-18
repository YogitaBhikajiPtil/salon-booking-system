const serviceService = require("../services/serviceService");
const sendResponse = require("../utils/response");

exports.createService = async (req, res) => {

    try {

        const service = await serviceService.createService(req.body);

        sendResponse(
            res,
            201,
            true,
            "Service created successfully",
            service
        );

    } catch (err) {

        sendResponse(res,400,false,err.message);

    }

};

exports.getAllServices = async (req, res) => {

    try {

        const services = await serviceService.getAllServices();

        sendResponse(
            res,
            200,
            true,
            "Services fetched successfully",
            services
        );

    } catch (err) {

        sendResponse(res,400,false,err.message);

    }

};

exports.getServiceById = async (req, res) => {

    try {

        const service = await serviceService.getServiceById(req.params.id);

        sendResponse(
            res,
            200,
            true,
            "Service fetched successfully",
            service
        );

    } catch (err) {

        sendResponse(res,404,false,err.message);

    }

};

exports.updateService = async (req, res) => {

    try {

        const service = await serviceService.updateService(
            req.params.id,
            req.body
        );

        sendResponse(
            res,
            200,
            true,
            "Service updated successfully",
            service
        );

    } catch (err) {

        sendResponse(res,400,false,err.message);

    }

};

exports.deleteService = async (req, res) => {

    try {

        await serviceService.deleteService(req.params.id);

        sendResponse(
            res,
            200,
            true,
            "Service deleted successfully"
        );

    } catch (err) {

        sendResponse(res,400,false,err.message);

    }

};