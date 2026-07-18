const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name is required"
                }
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Email already exists"
            },
            validate: {
                isEmail: {
                    msg: "Please enter a valid email"
                },
                notEmpty: {
                    msg: "Email is required"
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password is required"
                },
                len: {
                    args: [6, 100],
                    msg: "Password must be at least 6 characters long"
                }
            }
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Phone number is required"
                },
                len: {
                    args: [10, 10],
                    msg: "Phone number must be 10 digits"
                }
            }
        },
        address: {
    type: DataTypes.STRING,
    allowNull: true
},

  gender: {
    type: DataTypes.ENUM("Male", "Female", "Other"),
    allowNull: true
},

preferences: {
    type: DataTypes.TEXT,
    allowNull: true
},

        role: {
            type: DataTypes.ENUM("customer", "admin", "staff"),
            allowNull: false,
            defaultValue: "customer"
        }
    },
    {
        tableName: "users",
        timestamps: true
    }
);

module.exports = User;