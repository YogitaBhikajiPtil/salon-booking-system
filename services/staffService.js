const Staff = require("../models/Staff");
const Service = require("../models/Service");
const StaffAvailability = require("../models/StaffAvailability");

const createStaff = async (staffData) => {
    const existingStaff = await Staff.findOne({
        where: { email: staffData.email }
    });

    if (existingStaff) {
        throw new Error("Staff already exists with this email");
    }

    return await Staff.create(staffData);
};

const getAllStaff = async () => {
    return await Staff.findAll({
        include: [
            {
                model: Service,
                through: { attributes: [] }
            },
            {
                model: StaffAvailability
            }
        ]
    });
};

const getStaffById = async (id) => {
    const staff = await Staff.findByPk(id, {
        include: [
            {
                model: Service,
                through: { attributes: [] }
            },
            {
                model: StaffAvailability
            }
        ]
    });

    if (!staff) {
        throw new Error("Staff not found");
    }

    return staff;
};

const updateStaff = async (id, staffData) => {
    const staff = await Staff.findByPk(id);

    if (!staff) {
        throw new Error("Staff not found");
    }

    await staff.update(staffData);

    return staff;
};

const deleteStaff = async (id) => {
    const staff = await Staff.findByPk(id);

    if (!staff) {
        throw new Error("Staff not found");
    }

    await staff.destroy();

    return true;
};

const assignServices = async (staffId, serviceIds) => {
    const staff = await Staff.findByPk(staffId);

    if (!staff) {
        throw new Error("Staff not found");
    }

    const services = await Service.findAll({
        where: {
            id: serviceIds
        }
    });

    await staff.setServices(services);

    return await Staff.findByPk(staffId, {
        include: Service
    });
};

const addAvailability = async (availabilityData) => {

    const staff = await Staff.findByPk(
        availabilityData.staffId
    );

    if (!staff) {
        throw new Error("Staff not found");
    }

    return await StaffAvailability.create(
        availabilityData
    );
};

const getAvailability = async (staffId) => {

    return await StaffAvailability.findAll({
        where: {
            staffId
        }
    });

};

const getStaffByService = async (serviceId) => {

    return await Staff.findAll({

        where: {
            isAvailable: true
        },

        include: [

            {

                model: Service,

                where: {
                    id: serviceId
                },

                through: {
                    attributes: []
                }

            }

        ]

    });

};

module.exports = {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
    assignServices,
    addAvailability,
    getAvailability,
    getStaffByService
};