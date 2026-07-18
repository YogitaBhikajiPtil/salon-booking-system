const BASE_URL = "http://13.233.230.164/api";

window.onload = () => {
    const appointmentId = localStorage.getItem("appointmentId");

    if (!appointmentId) {
        alert("No appointment found. Please book again.");
        window.location.href = "services.html";
        return;
    }

    document.getElementById("appointmentId").innerText = appointmentId;
};

document.getElementById("payBtn").addEventListener("click", async () => {

    const appointmentId = localStorage.getItem("appointmentId");
    console.log("DEBUG appointmentId:", appointmentId);
    const token = localStorage.getItem("token");

    try {

        // STEP 1: Create order (YOUR ROUTE FIXED)
        const res = await fetch(`${BASE_URL}/payments/create-order/${appointmentId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log("Create Order Response:", data);

        if (!data.success) {
            alert("Order creation failed");
            return;
        }

        const order = data.order;

        // STEP 2: Open Razorpay
        const options = {
            key: data.key,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "Salon Booking System",
            description: "Appointment Payment",

            handler: async function (response) {

                // STEP 3: VERIFY PAYMENT (YOUR ROUTE FIXED)
                const verifyRes = await fetch(`${BASE_URL}/payments/verify`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        appointmentId
                    })
                });

                const verifyData = await verifyRes.json();

                if (verifyData.success) {
                    alert("Payment Successful 🎉");

                    // go to invoice page
                    window.location.href = "invoice.html";
                } else {
                    alert("Payment verification failed");
                }
            },

            prefill: {
                name: "Customer",
                email: "customer@test.com",
                contact: "9999999999"
            },

            theme: {
                color: "#3399cc"
            }
        };
        console.log("Razorpay Options:", options);
        const rzp = new Razorpay(options);
        rzp.on("payment.failed", function (response) {
    console.log("Payment Failed:", response.error);
    alert(response.error.description);
});
        rzp.open();

    } catch (err) {
        console.log(err);
        alert("Payment error");
    }
});