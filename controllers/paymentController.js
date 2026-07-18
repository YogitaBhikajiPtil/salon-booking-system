const paymentService = require("../services/paymentService");
const Payment = require("../models/Payment");

exports.createOrder = async (req, res) => {

    try {

        const order = await paymentService.createOrder(

            req.params.appointmentId

        );

        res.status(200).json({

            success: true,

            order,
            key: process.env.RAZORPAY_KEY_ID

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.verifyPayment = async (req, res) => {

    try {

        const payment = await paymentService.verifyPayment(

            req.body

        );

        res.status(200).json({

            success: true,

            message: "Payment Successful",

            payment

        });

    } catch (err) {

        res.status(400).json({

            success: false,

            message: err.message

        });

    }

};

exports.downloadInvoice =
async(req,res)=>{

    try{

        const payment =
        await Payment.findOne({

            where:{
                appointmentId:
                req.params.appointmentId
            }

        });

        if(!payment){

            return res.status(404).json({

                success:false,

                message:"Invoice not found"

            });

        }

        console.log(payment);
console.log(payment.invoicePath);
        res.download(payment.invoicePath);

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

}