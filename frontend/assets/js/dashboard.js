// Check Login

const token = localStorage.getItem("token");

if (!token) {

    alert("Please Login First");

    window.location.href = "login.html";

}

// Get User

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("userName").innerHTML =
    user.name;

document.getElementById("welcomeText").innerHTML =
    "Welcome " + user.name + " 👋";

    // ROLE BASED LINKS
const servicesLink = document.querySelector("a[href='services.html']");

if (user.role === "admin") {
    servicesLink.setAttribute("href", "admin-service.html");
    servicesLink.innerText = "Manage Services";
}

const staffLink = document.getElementById("staffLink");

if (user.role === "admin") {
    staffLink.href = "admin-staff.html";
    staffLink.innerText = "Manage Staff";
} else {
    staffLink.href = "staff.html";
    staffLink.innerText = "View Staff";
}



// Logout

document.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

});


const adminCards = document.querySelectorAll(".admin-card");

if(user.role === "admin"){

    adminCards.forEach(card=>{

        card.style.display = "block";

    });

}