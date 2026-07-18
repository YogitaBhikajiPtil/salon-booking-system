const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (
    appointment,
    payment,
    user,
    service,
    staff
) => {

    return new Promise((resolve, reject) => {

        const invoiceDir = path.join(__dirname, "../invoices");

        if (!fs.existsSync(invoiceDir)) {
            fs.mkdirSync(invoiceDir);
        }

        const fileName = `invoice_${appointment.id}.pdf`;

        const filePath = path.join(invoiceDir, fileName);

        const doc = new PDFDocument();

        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(24)
            .text("Salon Booking Invoice", {
                align: "center"
            });

        doc.moveDown();

        doc.fontSize(14);

        doc.text(`Invoice Number : INV-${appointment.id}`);
        doc.text(`Appointment ID : ${appointment.id}`);
        doc.text(`Customer Name  : ${user.name}`);
        doc.text(`Customer Email : ${user.email}`);

        doc.moveDown();

        doc.text(`Service : ${service.serviceName}`);
        doc.text(`Staff   : ${staff.name}`);
        doc.text(`Date    : ${appointment.appointmentDate}`);
        doc.text(`Time    : ${appointment.startTime}`);

        doc.moveDown();

        doc.text(`Amount Paid : ₹${payment.amount}`);

        doc.text(`Payment ID : ${payment.razorpayPaymentId}`);

        doc.text(`Payment Status : ${payment.status}`);

        doc.moveDown();

        doc.text("Thank you for visiting our Salon!");

        doc.end();

        stream.on("finish", () => {

            resolve(filePath);

        });

        stream.on("error", reject);

    });

};

module.exports = generateInvoice;