const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (userData) => {

    const { name, email, password, phone } = userData;

    // Check if email already exists
    const existingUser = await User.findOne({
        where: {
            email
        }
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role:"customer"
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
    };

};

const loginUser = async (email, password) => {

    // Find User
    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    // Compare Password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid Email or Password");
    }

    // Generate Token
    const token = generateToken(user);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    };

};

module.exports = {
    registerUser,
    loginUser
};