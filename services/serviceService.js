const Service = require("../models/Service");

const createService = async (data) => {
    return await Service.create(data);
};

const getAllServices = async () => {
    return await Service.findAll();
};

const getServiceById = async (id) => {

    const service = await Service.findByPk(id);

    if (!service)
        throw new Error("Service not found");

    return service;
};

const updateService = async (id, data) => {

    const service = await Service.findByPk(id);

    if (!service)
        throw new Error("Service not found");

    await service.update(data);

    return service;
};

const deleteService = async (id) => {

    const service = await Service.findByPk(id);

    if (!service)
        throw new Error("Service not found");

    await service.destroy();
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};