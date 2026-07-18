const BASE_URL = "http://13.233.230.164/api";
const token = localStorage.getItem("token");

async function addService() {

    const service = {
        serviceName: document.getElementById("name").value,
        description: document.getElementById("desc").value,
        price: Number(document.getElementById("price").value),
        duration: Number(document.getElementById("duration").value)
    };

    try {

        const res = await fetch(`${BASE_URL}/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(service)
        });

        const data = await res.json();

        alert(data.message);

        if (data.success) {
            window.location.href = "admin-service.html";
        }

    } catch (err) {
        console.error(err);
        alert("Failed to add service");
    }
}