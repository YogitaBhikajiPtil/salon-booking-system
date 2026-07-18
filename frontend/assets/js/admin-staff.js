const BASE_URL = "http://13.233.230.164/api";
const token = localStorage.getItem("token");

const form = document.getElementById("staffForm");
const table = document.getElementById("staffTable");

document.addEventListener("DOMContentLoaded", () => {
    loadStaff();
 if(form){
        form.addEventListener("submit", saveStaff);
    }
});

async function loadStaff() {

    try {

        const res = await fetch(`${BASE_URL}/staff`);

        const result = await res.json();

        table.innerHTML = "";

        result.data.forEach(staff => {

            table.innerHTML += `
            <tr>

                <td>
                    <img src="${staff.image || 'https://via.placeholder.com/60'}">
                </td>

                <td>${staff.name}</td>

                <td>${staff.email}</td>

                <td>${staff.phone}</td>

                <td>${staff.specialization}</td>

                <td>${staff.experience} Years</td>

                <td>

                    ${
                        staff.isAvailable
                        ? '<span class="status">Available</span>'
                        : '<span class="notAvailable">Unavailable</span>'
                    }

                </td>

                <td>

                    <button
                        class="editBtn"
                        onclick="editStaff(${staff.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="deleteBtn"
                        onclick="deleteStaff(${staff.id})"
                    >
                        Delete
                    </button>

                    <button
                        class="assignBtn"
                        onclick="openAssignModal(${staff.id})"
                    >
                        Services
                    </button>

                    <button
                        class="availableBtn"
                        onclick="openAvailabilityModal(${staff.id})"
                    >
                        Availability
                    </button>

                </td>

            </tr>
            `;

        });

    } catch (err) {

        alert(err.message);

    }

}

async function saveStaff(e) {

    e.preventDefault();

    const id = document.getElementById("staffId").value;

    const staff = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        specialization: document.getElementById("specialization").value,

        experience: document.getElementById("experience").value,

        image: document.getElementById("image").value,

        isAvailable: document.getElementById("isAvailable").checked

    };

    let url = `${BASE_URL}/staff`;

    let method = "POST";

    if(id){

        url = `${BASE_URL}/staff/${id}`;

        method = "PUT";

    }

    try{

        const res = await fetch(url,{

            method,

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify(staff)

        });

        const result = await res.json();

        alert(result.message);

        form.reset();

        document.getElementById("staffId").value="";

        document.getElementById("formTitle").innerText="Add Staff";

        loadStaff();

    }

    catch(err){

        alert(err.message);

    }

}

async function editStaff(id){

    try{

        const res = await fetch(`${BASE_URL}/staff/${id}`);

        const result = await res.json();

        const staff = result.data;

        document.getElementById("staffId").value=staff.id;

        document.getElementById("name").value=staff.name;

        document.getElementById("email").value=staff.email;

        document.getElementById("phone").value=staff.phone;

        document.getElementById("specialization").value=staff.specialization;

        document.getElementById("experience").value=staff.experience;

        document.getElementById("image").value=staff.image;

        document.getElementById("isAvailable").checked=staff.isAvailable;

        document.getElementById("formTitle").innerText="Edit Staff";

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

    catch(err){

        alert(err.message);

    }

}

async function deleteStaff(id){

    if(!confirm("Delete this staff?")) return;

    try{

        const res = await fetch(`${BASE_URL}/staff/${id}`,{

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        });

        const result = await res.json();

        alert(result.message);

        loadStaff();

    }

    catch(err){

        alert(err.message);

    }

}

// ===============================
// Assign Services
// ===============================

const serviceModal = document.getElementById("serviceModal");
const availabilityModal = document.getElementById("availabilityModal");

const servicesList = document.getElementById("servicesList");

async function openAssignModal(staffId) {

    document.getElementById("assignStaffId").value = staffId;

    serviceModal.style.display = "flex";

    await loadServices();

}

async function loadServices() {

    try {

        const res = await fetch(`${BASE_URL}/services`);

        const result = await res.json();

        servicesList.innerHTML = "";

        result.data.forEach(service => {

            servicesList.innerHTML += `

                <label>

                    <input
                        type="checkbox"
                        value="${service.id}"
                    >

                    ${service.serviceName}

                </label>

            `;

        });

    }

    catch (err) {

        alert(err.message);

    }

}

document
.getElementById("assignBtn")
.addEventListener("click", assignServices);

async function assignServices() {

    const staffId =
        document.getElementById("assignStaffId").value;

    const serviceIds = [];

    document
        .querySelectorAll("#servicesList input:checked")
        .forEach(item => {

            serviceIds.push(Number(item.value));

        });

    try {

        const res = await fetch(
            `${BASE_URL}/staff/assign-services`,
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    staffId,

                    serviceIds

                })

            }
        );

        const result = await res.json();

        alert(result.message);

        serviceModal.style.display = "none";

        loadStaff();

    }

    catch (err) {

        alert(err.message);

    }

}

// ===============================
// Availability
// ===============================

function openAvailabilityModal(staffId) {

    document
        .getElementById("availabilityStaffId")
        .value = staffId;

    availabilityModal.style.display = "flex";

}

document
.getElementById("availabilityBtn")
.addEventListener("click", saveAvailability);

async function saveAvailability() {

    const data = {

        staffId:

        document
        .getElementById("availabilityStaffId")
        .value,

        day:

        document
        .getElementById("day")
        .value,

        startTime:

        document
        .getElementById("startTime")
        .value,

        endTime:

        document
        .getElementById("endTime")
        .value

    };

    try {

        const res = await fetch(

            `${BASE_URL}/staff/availability`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(data)

            }

        );

        const result = await res.json();

        alert(result.message);

        availabilityModal.style.display = "none";

    }

    catch (err) {

        alert(err.message);

    }

}

// ===============================
// Close Modals
// ===============================

document
.getElementById("closeServiceModal")
.onclick = () => {

    serviceModal.style.display = "none";

};

document
.getElementById("closeAvailabilityModal")
.onclick = () => {

    availabilityModal.style.display = "none";

};

window.onclick = function (e) {

    if (e.target == serviceModal) {

        serviceModal.style.display = "none";

    }

    if (e.target == availabilityModal) {

        availabilityModal.style.display = "none";

    }

};

// ===============================
// Reset Form
// ===============================

function clearForm() {

    form.reset();

    document.getElementById("staffId").value = "";

    document.getElementById("formTitle").innerText =
        "Add Staff";

}