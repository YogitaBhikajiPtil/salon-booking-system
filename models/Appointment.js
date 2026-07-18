const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Service = require("./Service");
const Staff = require("./Staff");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    appointmentDate: {
      type: DataTypes.DATEONLY,
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

    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
        "Rescheduled"
      ),
      defaultValue: "Pending",
    },

    paymentStatus: {
      type: DataTypes.ENUM(
        "Pending",
        "Paid",
        "Failed",
        "Refunded"
      ),
      defaultValue: "Pending",
    },
    
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    
    reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
},
  },
  {
    timestamps: true,
  }
);

/* ===========================
   Associations
=========================== */

User.hasMany(Appointment, {
  foreignKey: "userId",
});

Appointment.belongsTo(User, {
  foreignKey: "userId",
});

Service.hasMany(Appointment, {
  foreignKey: "serviceId",
});

Appointment.belongsTo(Service, {
  foreignKey: "serviceId",
});

Staff.hasMany(Appointment, {
  foreignKey: "staffId",
});

Appointment.belongsTo(Staff, {
  foreignKey: "staffId",
});

module.exports = Appointment;