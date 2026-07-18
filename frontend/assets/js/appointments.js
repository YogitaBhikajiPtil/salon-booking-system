const BASE_URL = "http://13.233.230.164/api";
const token = localStorage.getItem("token");

// LOAD APPOINTMENTS (MY)
async function loadAppointments() {
    try {
        const res = await fetch(`${BASE_URL}/appointments/my`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        const container = document.getElementById("appointmentsContainer");
        container.innerHTML = "";

        data.data.forEach(app => {

            container.innerHTML += `
                <div class="card">
                    <h3>Service ID: ${app.serviceId}</h3>

                    <p><b>Date:</b> ${app.appointmentDate}</p>
                    <p><b>Start:</b> ${app.startTime}</p>
                    <p><b>End:</b> ${app.endTime}</p>
                    <p><b>Status:</b> ${app.status}</p>

                    <button class="cancel" onclick="cancelAppointment(${app.id})">
                        Cancel
                    </button>

                    <button class="reschedule" onclick="toggleBox(${app.id})">
                        Reschedule
                    </button>

                    <div class="box" id="box-${app.id}">
                        <input type="date" id="date-${app.id}">
                        <input type="time" id="time-${app.id}">

                        <button class="save" onclick="reschedule(${app.id})">
                            Save
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.log(err);
    }
}

async function cancelAppointment(id) {

    const res = await fetch(`${BASE_URL}/appointments/cancel/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    alert("Appointment cancelled");
    loadAppointments();
}
function toggleBox(id) {
    const box = document.getElementById(`box-${id}`);
    box.style.display = box.style.display === "block" ? "none" : "block";
}

async function reschedule(id) {

    const appointmentDate = document.getElementById(`date-${id}`).value;
    const startTime = document.getElementById(`time-${id}`).value;

    if (!appointmentDate || !startTime) {
        alert("Please select date and time");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/appointments/reschedule/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                appointmentDate,
                startTime
            })
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            alert(data.message || "Reschedule failed");
            return;
        }

        alert("Rescheduled successfully");
        loadAppointments();

    } catch (err) {
        console.log(err);
    }
}
loadAppointments();