// ===============================
// Admin Authentication
// ===============================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const staffTable = document.getElementById("staffTable");
const staffForm = document.getElementById("staffForm");


// ===============================
// Load All Staff
// ===============================

async function loadStaff() {

    try {

        const response = await fetch(`${BASE_URL}/staff`);

        const result = await response.json();

        console.log(result);

        staffTable.innerHTML = "";

        result.data.forEach(staff => {

            staffTable.innerHTML += `

            <tr>

                <td>${staff.id}</td>

                <td>${staff.name}</td>

                <td>${staff.email}</td>

                <td>${staff.specialization || "-"}</td>

                <td>${staff.experience || "-"}</td>

                <td>

                    <button
                        class="action-btn edit"
                        onclick="editStaff(${staff.id})">

                        Edit

                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteStaff(${staff.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

        loadStaffDropdown(result.data);

    } catch (err) {

        console.log(err);

    }

}

loadStaff();


// ===============================
// Add / Update Staff
// ===============================

staffForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("staffId").value;

    const staff = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        specialization: document.getElementById("specialization").value,

        experience: document.getElementById("experience").value

    };

    try {

        let response;

        if (id) {

            response = await fetch(

                `${BASE_URL}/staff/${id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(staff)

                }

            );

        } else {

            response = await fetch(

                `${BASE_URL}/staff`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`

                    },

                    body: JSON.stringify(staff)

                }

            );

        }

        const result = await response.json();

        alert(result.message);

        staffForm.reset();

        document.getElementById("staffId").value = "";

        loadStaff();

    } catch (err) {

        console.log(err);

    }

});


// ===============================
// Edit Staff
// ===============================

async function editStaff(id) {

    try {

        const response = await fetch(

            `${BASE_URL}/staff/${id}`

        );

        const result = await response.json();

        const staff = result.data;

        document.getElementById("staffId").value =
            staff.id;

        document.getElementById("name").value =
            staff.name;

        document.getElementById("email").value =
            staff.email;

        document.getElementById("phone").value =
            staff.phone;

        document.getElementById("specialization").value =
            staff.specialization;

        document.getElementById("experience").value =
            staff.experience;

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    } catch (err) {

        console.log(err);

    }

}


// ===============================
// Delete Staff
// ===============================

async function deleteStaff(id) {

    const confirmDelete =
        confirm("Delete this staff?");

    if (!confirmDelete)
        return;

    try {

        const response = await fetch(

            `${BASE_URL}/staff/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        alert(result.message);

        loadStaff();

    } catch (err) {

        console.log(err);

    }

}

// ===============================
// Staff Dropdowns
// ===============================

function loadStaffDropdown(staffs) {

    const assignStaff =
        document.getElementById("assignStaff");

    const availabilityStaff =
        document.getElementById("availabilityStaff");

    assignStaff.innerHTML =
        `<option value="">Select Staff</option>`;

    availabilityStaff.innerHTML =
        `<option value="">Select Staff</option>`;

    staffs.forEach(staff => {

        assignStaff.innerHTML +=
            `<option value="${staff.id}">
                ${staff.name}
            </option>`;

        availabilityStaff.innerHTML +=
            `<option value="${staff.id}">
                ${staff.name}
            </option>`;

    });

}


// ===============================
// Load Services
// ===============================

async function loadServices() {

    try {

        const response = await fetch(
            `${BASE_URL}/services`
        );

        const result = await response.json();

        const container =
            document.getElementById("serviceCheckboxes");

        container.innerHTML = "";

        result.data.forEach(service => {

            container.innerHTML += `

                <label>

                    <input
                        type="checkbox"
                        value="${service.id}"
                        class="serviceCheck">

                    ${service.serviceName}

                </label>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

loadServices();


// ===============================
// Assign Services
// ===============================

document
.getElementById("assignBtn")
.addEventListener("click", async () => {

    const staffId =
        document.getElementById("assignStaff").value;

    if (!staffId) {

        alert("Select Staff");

        return;

    }

    const serviceIds = [];

    document
        .querySelectorAll(".serviceCheck:checked")
        .forEach(item => {

            serviceIds.push(item.value);

        });

    if (serviceIds.length === 0) {

        alert("Select at least one service");

        return;

    }

    try {

        const response = await fetch(

            `${BASE_URL}/staff/assign-services`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`

                },

                body: JSON.stringify({

                    staffId,

                    serviceIds

                })

            }

        );

        const result =
            await response.json();

        alert(result.message);

    } catch (err) {

        console.log(err);

    }

});


// ===============================
// Add Availability
// ===============================

document
.getElementById("availabilityBtn")
.addEventListener("click", async () => {

    const staffId =
        document.getElementById("availabilityStaff").value;

    const day =
        document.getElementById("day").value;

    const startTime =
        document.getElementById("startTime").value;

    const endTime =
        document.getElementById("endTime").value;

    if (
        !staffId ||
        !day ||
        !startTime ||
        !endTime
    ) {

        alert("Fill all fields");

        return;

    }

    try {

        const response = await fetch(

            `${BASE_URL}/staff/availability`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`

                },

                body: JSON.stringify({

                    staffId,

                    day,

                    startTime,

                    endTime

                })

            }

        );

        const result =
            await response.json();

        alert(result.message);

    } catch (err) {

        console.log(err);

    }

});