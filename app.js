require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
// Import Models
require("./models/User");

const sequelize = require("./config/db");

const app = express();

// Middlewares

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);

app.use("/api/users", profileRoutes);

// Health Check Route

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Salon Booking API is Running"
    });

});


// 404 Route

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });

});


// Database Connection

sequelize.sync({ alter: true })
.then(() => {

    console.log("✅ Database Connected");

    app.listen(process.env.PORT, () => {

        console.log(
            `🚀 Server running on port ${process.env.PORT}`
        );

    });

})
.catch((error) => {

    console.log(error);

});