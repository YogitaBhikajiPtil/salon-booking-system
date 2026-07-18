const sequelize = require("../config/db");


const User = require("./User");
const Service = require("./Service");
const Staff = require("./Staff");
const StaffService = require("./StaffService");
const StaffAvailability = require("./staffAvailability");


// Associations

User.hasOne(Staff);
Staff.belongsTo(User);

Staff.belongsToMany(Service, {
  through: StaffService
});

Service.belongsToMany(Staff, {
  through: StaffService
});


module.exports = {
  sequelize,
  User,
  Service,
  Staff,
  StaffService,
  StaffAvailability
};