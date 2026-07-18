const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const StaffService = sequelize.define(
  "StaffService",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = StaffService;

const getStaffByService = async (serviceId) => {

    return await Staff.findAll({

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

        ],

        where: {

            isAvailable: true

        }

    });

};