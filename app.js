require("dotenv").config();
require("./jobs/reminderJob");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes = require("./routes/staffRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require("./middleware/errorHandler");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes =
require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

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
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payments", paymentRoutes); 
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);
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

sequelize.sync()
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