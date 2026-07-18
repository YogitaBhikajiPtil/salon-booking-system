const BASE_URL= "http://13.233.230.164/api";
const token = localStorage.getItem("token");

async function loadServices() {
    try {
        const res = await fetch(`${BASE_URL}/services`);
        const data = await res.json();

        console.log(data);

        const container = document.getElementById("adminServices");
        container.innerHTML = "";

        if (!data.success) {
            container.innerHTML = "<h3>No services found</h3>";
            return;
        }

        data.data.forEach(service => {
            container.innerHTML += `
                <div class="card">
                    <h3>${service.serviceName}</h3>
                    <p>${service.description}</p>
                    <p><strong>₹${service.price}</strong></p>

                    <button class="btn-primary"
                        onclick="editService(${service.id})">
                        Edit
                    </button>

                    <button class="btn-danger"
                        onclick="deleteService(${service.id})">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

function editService(id) {
    localStorage.setItem("editServiceId", id);
    window.location.href = "edit-service.html";
}

async function deleteService(id) {
    try {
        const res = await fetch(`${BASE_URL}/services/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        alert(data.message);

        loadServices();

    } catch (err) {
        console.error(err);
    }
}

loadServices();