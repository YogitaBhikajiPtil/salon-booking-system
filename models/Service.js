const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Staff = require("./Staff");
const StaffService = require("./StaffService");

const Service = sequelize.define("Service", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    serviceName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
    },

    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    workingDays: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    startTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    endTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

Service.belongsToMany(Staff, {
  through: StaffService,
  foreignKey: "serviceId",
});

Staff.belongsToMany(Service, {
  through: StaffService,
  foreignKey: "staffId",
});

module.exports = Service;