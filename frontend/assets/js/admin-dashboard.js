const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
};

// Dashboard Stats
async function loadDashboard() {

    try {

        const res = await fetch(`${BASE_URL}/admin/dashboard`, {
            headers
        });

        const data = await res.json();

        console.log(data);

        if(data.success){

            document.getElementById("customers").innerText =
            data.stats.totalCustomers;

            document.getElementById("staff").innerText =
            data.stats.totalStaff;

            document.getElementById("services").innerText =
            data.stats.totalServices;

            document.getElementById("appointments").innerText =
            data.stats.totalAppointments;

            document.getElementById("completed").innerText =
            data.stats.completedAppointments;

            document.getElementById("pending").innerText =
            data.stats.pendingAppointments;

            document.getElementById("cancelled").innerText =
            data.stats.cancelledAppointments;

        }

    } catch(err){

        console.log(err);

    }

}

// Revenue
async function loadRevenue(){

    try{

        const res = await fetch(`${BASE_URL}/admin/revenue`,{

            headers

        });

        const data = await res.json();

        console.log(data);

        if(data.success){

            document.getElementById("revenue").innerText =
            "₹" + (data.revenue.totalRevenue || 0);

        }

    }

    catch(err){

        console.log(err);

    }

}

// Reviews
async function loadReviews(){

    try{

        const res = await fetch(`${BASE_URL}/admin/reviews`,{

            headers

        });

        const data = await res.json();

        console.log(data);

        if(data.success){

            document.getElementById("rating").innerText =
            Number(data.reviews.averageRating || 0).toFixed(1);

            document.getElementById("reviews").innerText =
            data.reviews.totalReviews || 0;

        }

    }

    catch(err){

        console.log(err);

    }

}

// Monthly Revenue
async function loadMonthlyRevenue(){

    try{

        const res = await fetch(`${BASE_URL}/admin/monthly-revenue`,{

            headers

        });

        const data = await res.json();

        console.log(data);

        const tbody =
        document.getElementById("monthlyRevenue");

        tbody.innerHTML="";

        if(data.success){

            data.revenue.forEach(item=>{

                tbody.innerHTML +=`

                <tr>

                    <td>${item.month}</td>

                    <td>₹${item.revenue}</td>

                </tr>

                `;

            });

        }

    }

    catch(err){

        console.log(err);

    }

}

document.getElementById("logoutBtn")
.addEventListener("click",()=>{

    localStorage.clear();

    window.location.href="login.html";

});

loadDashboard();

loadRevenue();

loadReviews();

loadMonthlyRevenue();