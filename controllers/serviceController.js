const Service = require("../models/Service");


// CREATE SERVICE

exports.createService = async (req, res) => {

    try {

        const {
            serviceName,
            description,
            duration,
            price
        } = req.body;

        const service = await Service.create({
            serviceName,
            description,
            duration,
            price
        });

        res.status(201).json({
            message: "Service Created",
            service
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET ALL SERVICES

exports.getAllServices = async (req, res) => {

    try {

        const services = await Service.findAll();

        res.status(200).json(services);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET SINGLE SERVICE

exports.getServiceById = async (req, res) => {

    try {

        const service = await Service.findByPk(
            req.params.id
        );

        if (!service) {

            return res.status(404).json({
                message: "Service Not Found"
            });

        }

        res.status(200).json(service);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// UPDATE SERVICE

exports.updateService = async (req, res) => {

    try {

        const service = await Service.findByPk(
            req.params.id
        );

        if (!service) {

            return res.status(404).json({
                message: "Service Not Found"
            });

        }

        await service.update(req.body);

        res.status(200).json({
            message: "Service Updated",
            service
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// DELETE SERVICE

exports.deleteService = async (req, res) => {

    try {

        const service = await Service.findByPk(
            req.params.id
        );

        if (!service) {

            return res.status(404).json({
                message: "Service Not Found"
            });

        }

        await service.destroy();

        res.status(200).json({
            message: "Service Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};