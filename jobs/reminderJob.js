const cron = require("node-cron");

const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Service = require("../models/Service");
const Staff = require("../models/Staff");

const sendEmail = require("../services/emailService");
const { reminderTemplate } = require("../utils/emailTemplates");

// Runs every minute (change to "0 * * * *" for every hour in production)
cron.schedule("0 * * * *", async () => {
    console.log("Checking appointment reminders...");

    try {

        // Tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const searchDate = tomorrow.toLocaleDateString("en-CA");

        console.log("Searching Date:", searchDate);

        // Get tomorrow's pending appointments
        const appointments = await Appointment.findAll({
            where: {
                appointmentDate: searchDate,
                status: "Pending",
                reminderSent: false
            },
            include: [
                {
                    model: User
                },
                {
                    model: Service
                },
                {
                    model: Staff
                }
            ]
        });

        console.log("Appointments Found:", appointments.length);

        if (appointments.length === 0) {
            console.log("No appointments found.");
            return;
        }

        for (const appointment of appointments) {

            console.log("Appointment ID:", appointment.id);

            if (!appointment.User) {
                console.log("User not found.");
                continue;
            }

            if (!appointment.Service) {
                console.log("Service not found.");
                continue;
            }

            if (!appointment.Staff) {
                console.log("Staff not found.");
                continue;
            }

            console.log("Sending reminder to:", appointment.User.email);

            await sendEmail(
                appointment.User.email,
                "Appointment Reminder",
                reminderTemplate(
                    appointment.User.name,
                    appointment.Service.serviceName,
                    appointment.Staff.name,
                    appointment.appointmentDate,
                    appointment.startTime
                )
            );

            appointment.reminderSent = true;
            await appointment.save();

            console.log(
                `Reminder sent for Appointment ID ${appointment.id}`
            );
        }

        console.log("Reminder job completed.");

    } catch (err) {
        console.error("Reminder Job Error:", err);
    }
});