const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const phone = document.getElementById("phone").value;

    try {

        const response = await fetch(`${BASE_URL}/auth/register`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,
                email,
                password,
                phone

            })

        });

        const data = await response.json();

        if(response.ok){

            alert("Registration Successful");

            window.location.href="login.html";

        }
        else{

            alert(data.message);

        }

    }
    catch(error){

        console.log(error);

        alert("Server Error");

    }

});