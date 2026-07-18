const BASE_URL = "http://13.233.230.164/api";
const token = localStorage.getItem("token");

const serviceSelect = document.getElementById("service");
const staffSelect = document.getElementById("staff");
const dateInput = document.getElementById("appointmentDate");
const slotsContainer = document.getElementById("slotsContainer");
const bookingForm = document.getElementById("bookingForm");

let selectedSlot = "";

// =======================
// Load Services
// =======================

async function loadServices() {

    try {

        const res = await fetch(`${BASE_URL}/services`);

        const result = await res.json();

        result.data.forEach(service => {

            serviceSelect.innerHTML += `
                <option value="${service.id}">
                    ${service.serviceName}
                </option>
            `;

        });

    } catch (err) {

        alert(err.message);

    }

}

// =======================
// Load Staff
// =======================

async function loadStaffByService() {

    const serviceId = serviceSelect.value;

    staffSelect.innerHTML =
        `<option value="">Select Staff</option>`;

    if (!serviceId)
        return;

    try {

        const res = await fetch(

`${BASE_URL}/staff/service/${serviceId}`

        );

        const result = await res.json();

        result.data.forEach(staff => {

            staffSelect.innerHTML += `

                <option value="${staff.id}">

                    ${staff.name}

                    (${staff.specialization})

                </option>

            `;

        });

    }

    catch (err) {

        alert(err.message);

    }

}

// =======================
// Check Available Slots
// =======================

document
.getElementById("checkSlotsBtn")
.addEventListener("click", loadSlots);

async function loadSlots() {

    const serviceId = serviceSelect.value;
    const staffId = staffSelect.value;
    const appointmentDate = dateInput.value;

    if (!serviceId || !staffId || !appointmentDate) {

        return alert(
            "Select service, staff and date first."
        );

    }

    try {

        const res = await fetch(

`${BASE_URL}/appointments/slots?serviceId=${serviceId}&staffId=${staffId}&appointmentDate=${appointmentDate}`

        );

        const result = await res.json();

        slotsContainer.innerHTML = "";

        if (result.data.length === 0) {

            slotsContainer.innerHTML =
                `<p class="no-slots">
                    No slots available.
                </p>`;

            return;

        }

        result.data.forEach(slot => {

            slotsContainer.innerHTML += `

            <label class="slot">

                <input
                    type="radio"
                    name="slot"
                    value="${slot.startTime}"
                >

                ${slot.startTime} - ${slot.endTime}

            </label>

            `;

        });

        document
        .querySelectorAll("input[name='slot']")
        .forEach(radio => {

            radio.addEventListener("change", function () {

                selectedSlot = this.value;

            });

        });

    } catch (err) {

        alert(err.message);

    }

}

// =======================
// Book Appointment
// =======================

bookingForm.addEventListener(
    "submit",
    bookAppointment
);
bookingForm.addEventListener("submit", bookAppointment);

async function bookAppointment(e) {

    e.preventDefault();

    const serviceId = serviceSelect.value;
    const staffId = staffSelect.value;
    const appointmentDate = dateInput.value;
    const startTime = selectedSlot;

    if (!startTime) {
        alert("Please select a time slot.");
        return;
    }

    try {

        const res = await fetch(`${BASE_URL}/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                serviceId,
                staffId,
                appointmentDate,
                startTime
            })
        });

        const data = await res.json();

        console.log(data);

        if (data.success) {

            // Save appointment ID
            localStorage.setItem("appointmentId", data.data.id);

            alert("Appointment booked successfully!");

            // Redirect to payment page
            window.location.href = "payment.html";

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.error(err);
        alert("Booking failed.");

    }
}
// =======================
// Initialize
// =======================

loadServices();
serviceSelect.addEventListener(
    "change",
    loadStaffByService
);