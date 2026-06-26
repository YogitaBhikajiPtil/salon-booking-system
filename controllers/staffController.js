const { Staff, User, Service } = require("../models");


// CREATE STAFF

exports.createStaff = async (req, res) => {

    try {

        const {
            userId,
            specialization,
            availability
        } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const staff = await Staff.create({
            userId,
            specialization,
            availability
        });

        res.status(201).json({
            message: "Staff Created",
            staff
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET ALL STAFF

exports.getAllStaff = async (req, res) => {

    try {

        const staffs = await Staff.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["password"]
                    }
                },
                {
                    model: Service
                }
            ]
        });

        res.status(200).json(staffs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// GET SINGLE STAFF

exports.getStaffById = async (req, res) => {

    try {

        const staff = await Staff.findByPk(
            req.params.id,
            {
                include: [
                    User,
                    Service
                ]
            }
        );

        if (!staff) {

            return res.status(404).json({
                message: "Staff Not Found"
            });

        }

        res.status(200).json(staff);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// UPDATE STAFF

exports.updateStaff = async (req, res) => {

    try {

        const staff = await Staff.findByPk(
            req.params.id
        );

        if (!staff) {

            return res.status(404).json({
                message: "Staff Not Found"
            });

        }

        await staff.update(req.body);

        res.status(200).json({
            message: "Staff Updated",
            staff
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// DELETE STAFF

exports.deleteStaff = async (req, res) => {

    try {

        const staff = await Staff.findByPk(
            req.params.id
        );

        if (!staff) {

            return res.status(404).json({
                message: "Staff Not Found"
            });

        }

        await staff.destroy();

        res.status(200).json({
            message: "Staff Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// ASSIGN SERVICE TO STAFF

exports.assignService = async (req, res) => {

    try {

        const {
            staffId,
            serviceId
        } = req.body;

        const staff =
            await Staff.findByPk(staffId);

        const service =
            await Service.findByPk(serviceId);

        if (!staff || !service) {

            return res.status(404).json({
                message:
                "Staff or Service Not Found"
            });

        }

        await staff.addService(service);

        res.status(200).json({
            message:
            "Service Assigned Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};