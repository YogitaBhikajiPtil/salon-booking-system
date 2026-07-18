const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Service = require("./Service");
const Staff = require("./Staff");
const Appointment = require("./Appointment");

const Review = sequelize.define("Review", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },

    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    staffReply: {
        type: DataTypes.TEXT,
        defaultValue: null
    }

}, {
    timestamps: true
});

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Service.hasMany(Review, { foreignKey: "serviceId" });
Review.belongsTo(Service, { foreignKey: "serviceId" });

Staff.hasMany(Review, { foreignKey: "staffId" });
Review.belongsTo(Staff, { foreignKey: "staffId" });

Appointment.hasOne(Review, { foreignKey: "appointmentId" });
Review.belongsTo(Appointment, { foreignKey: "appointmentId" });

module.exports = Review;