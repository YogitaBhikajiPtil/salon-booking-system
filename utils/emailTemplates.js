const bookingTemplate = (
    customerName,
    serviceName,
    staffName,
    appointmentDate,
    startTime
) => {

    return `
    <div style="font-family:Arial;padding:20px">

        <h2>Appointment Confirmed 🎉</h2>

        <p>Hello <b>${customerName}</b>,</p>

        <p>Your appointment has been successfully booked.</p>

        <table border="1" cellpadding="8">

            <tr>
                <td><b>Service</b></td>
                <td>${serviceName}</td>
            </tr>

            <tr>
                <td><b>Staff</b></td>
                <td>${staffName}</td>
            </tr>

            <tr>
                <td><b>Date</b></td>
                <td>${appointmentDate}</td>
            </tr>

            <tr>
                <td><b>Time</b></td>
                <td>${startTime}</td>
            </tr>

        </table>

        <br>

        <p>Thank you for choosing our salon ❤️</p>

    </div>
    `;
};

module.exports = {
    bookingTemplate
};

const cancelTemplate = (
    customerName,
    serviceName
) => {

    return `
    <h2>Appointment Cancelled</h2>

    <p>Hello ${customerName},</p>

    <p>Your appointment for <b>${serviceName}</b> has been cancelled.</p>

    <p>We hope to see you again soon.</p>
    `;

};

const rescheduleTemplate = (
    customerName,
    date,
    time
) => {

    return `
    <h2>Appointment Rescheduled</h2>

    <p>Hello ${customerName},</p>

    <p>Your appointment has been rescheduled.</p>

    <p><b>${date}</b></p>

    <p><b>${time}</b></p>
    `;

};

const reminderTemplate = (
    customerName,
    serviceName,
    staffName,
    appointmentDate,
    startTime
) => {

    return `

    <div style="font-family:Arial">

    <h2>Appointment Reminder ⏰</h2>

    <p>Hello <b>${customerName}</b>,</p>

    <p>This is a reminder that you have an appointment tomorrow.</p>

    <table border="1" cellpadding="8">

        <tr>
            <td>Service</td>
            <td>${serviceName}</td>
        </tr>

        <tr>
            <td>Staff</td>
            <td>${staffName}</td>
        </tr>

        <tr>
            <td>Date</td>
            <td>${appointmentDate}</td>
        </tr>

        <tr>
            <td>Time</td>
            <td>${startTime}</td>
        </tr>

    </table>

    <br>

    <p>See you soon ❤️</p>

    </div>

    `;

};

module.exports = {

    bookingTemplate,

    cancelTemplate,

    rescheduleTemplate,

    reminderTemplate

};

