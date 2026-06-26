require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes =
require("./routes/staffRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/services", serviceRoutes);
app.use( "/api/staff",
    staffRoutes
);


// Route Not Found

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});


// Global Error Handler

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.get("/", (req, res) => {
  res.send("Salon Booking API Running");
});

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");

    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });