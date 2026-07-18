const BASE_URL = "http://13.233.230.164/api";


const container = document.getElementById("staffContainer");

async function loadStaff(){

    const res = await fetch("BASE_URL/api/staff");

    const result = await res.json();

    container.innerHTML="";

    result.data
        .filter(staff => staff.isAvailable)
        .forEach(staff=>{

        container.innerHTML += `

        <div class="staff-card">

            <img src="${staff.image || 'https://via.placeholder.com/150'}">

            <h3>${staff.name}</h3>

            <p>${staff.specialization}</p>

            <p>${staff.experience} Years Experience</p>

            <p>${staff.email}</p>

            <p>${staff.phone}</p>

            <button
            onclick="location.href='booking.html?staffId=${staff.id}'">

            Book Appointment

            </button>

        </div>

        `;

    });

}

loadStaff();