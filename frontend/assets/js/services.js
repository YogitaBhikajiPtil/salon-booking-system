const BASE_URL = "http://13.233.230.164/api";

async function loadServices() {
    try {
        const res = await fetch(`${BASE_URL}/services`);

        // If API fails (404, 500 etc.)
        if (!res.ok) {
            throw new Error("Failed to fetch services");
        }

        const data = await res.json();

        console.log("API RESPONSE:", data);

        const container = document.getElementById("services");
        container.innerHTML = "";

        // Backend format: { success, message, data }
        const services = data.data;

        // Validation check
        if (!services || !Array.isArray(services) || services.length === 0) {
            container.innerHTML = `
                <p style="text-align:center; font-size:18px;">
                    No services available
                </p>
            `;
            return;
        }

        // Render services
        services.forEach(service => {
            container.innerHTML += `
                <div class="card">
                    <h3>${service.serviceName}</h3>

                    <p>${service.description ? service.description : "No description"}</p>

                    <p><b>Price:</b> ₹${service.price}</p>

                    <p><b>Duration:</b> ${service.duration} minutes</p>

                    <button class="btn-primary"
                        onclick="bookService(${service.id})">
                        Book Appointment
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading services:", error);

        document.getElementById("services").innerHTML = `
            <p style="text-align:center; color:red;">
                Unable to load services. Please try again later.
            </p>
        `;
    }
}

// Save selected service and redirect
function bookService(serviceId) {
    localStorage.setItem("serviceId", serviceId);
    window.location.href = "booking.html";
}

// Load on page open
loadServices();