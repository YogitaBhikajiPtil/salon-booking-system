const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || user.role !== "admin") {
    window.location.href = "login.html";
}

async function loadAppointments(status = "") {

    let url = `${BASE_URL}/admin/appointments`;

    if (status) {
        url = `${BASE_URL}/admin/appointments/status/${status}`;
    }

    try {

        const response = await fetch(url, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        console.log(data);

        const table =
        document.getElementById("appointmentTable");

        table.innerHTML = "";

        data.appointments.forEach(app => {

            table.innerHTML += `

            <tr>

                <td>${app.id}</td>

                <td>${app.User?.name || "-"}</td>

                <td>${app.Service?.serviceName || "-"}</td>

                <td>${app.Staff?.name || "-"}</td>

                <td>${app.appointmentDate}</td>

                <td>${app.startTime}</td>

                <td>${app.endTime}</td>

                <td>

                    <select onchange="updateStatus(${app.id},this.value)">

                        <option value="Pending" ${app.status=="Pending"?"selected":""}>Pending</option>

                        <option value="Confirmed" ${app.status=="Confirmed"?"selected":""}>Confirmed</option>

                        <option value="Completed" ${app.status=="Completed"?"selected":""}>Completed</option>

                        <option value="Cancelled" ${app.status=="Cancelled"?"selected":""}>Cancelled</option>

                        <option value="Rescheduled" ${app.status=="Rescheduled"?"selected":""}>Rescheduled</option>

                    </select>

                </td>

                <td>${app.paymentStatus}</td>

                <td>

                    <button
                    class="deleteBtn"
                    onclick="deleteAppointment(${app.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

async function updateStatus(id,status){

    const response = await fetch(

        `${BASE_URL}/admin/appointments/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                status

            })

        }

    );

    const data = await response.json();

    alert(data.message);

}

async function deleteAppointment(id){

    if(!confirm("Delete Appointment?")) return;

    const response = await fetch(

        `${BASE_URL}/admin/appointments/${id}`,

        {

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    alert(data.message);

    loadAppointments();

}

document.getElementById("statusFilter")

.addEventListener("change",function(){

    loadAppointments(this.value);

});

loadAppointments();