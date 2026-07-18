const transporter = require("../config/email");

const sendEmail = async (to, subject, html) => {

    try {

        await transporter.sendMail({
            from: `"Salon Booking" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent successfully");

    } catch (err) {

        console.log("Email Error:", err.message);

    }

};

module.exports = sendEmail;