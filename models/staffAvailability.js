const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Staff = require("./Staff");

const StaffAvailability = sequelize.define(
  "StaffAvailability",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    day: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    breakStart: {
    type: DataTypes.TIME,
    allowNull: true
},

breakEnd: {
    type: DataTypes.TIME,
    allowNull: true
}
  },
  {
    timestamps: true,
  }
);

Staff.hasMany(StaffAvailability, {
  foreignKey: "staffId",
  onDelete: "CASCADE",
});

StaffAvailability.belongsTo(Staff, {
  foreignKey: "staffId",
});

module.exports = StaffAvailability;