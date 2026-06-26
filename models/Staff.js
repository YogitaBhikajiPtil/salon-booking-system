const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    specialization: {
      type: DataTypes.STRING,
      allowNull: false
    },

    availability: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = Staff;