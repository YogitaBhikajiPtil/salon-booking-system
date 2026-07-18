const BASE_URL = "http://13.233.230.164";
const token = localStorage.getItem("token");
const id = localStorage.getItem("editServiceId");

async function loadService() {
    const res = await fetch(`${BASE_URL}/services/${id}`);
    const data = await res.json();

    document.getElementById("name").value = data.data.serviceName;
    document.getElementById("desc").value = data.data.description;
    document.getElementById("price").value = data.data.price;
    document.getElementById("duration").value = data.data.duration;
}

async function updateService() {
    const data = {
        serviceName: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        price: document.getElementById("price").value,
        duration: document.getElementById("duration").value
    };

    const res = await fetch(`${BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert("Updated successfully");
        window.location.href = "admin-services.html";
    }
}

loadService();