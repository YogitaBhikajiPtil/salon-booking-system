const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

const form = document.getElementById("profileForm");

// ============================
// Load Profile
// ============================

async function loadProfile() {

    try {

        const response = await fetch(

            `${BASE_URL}/users/profile`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        console.log(result);

        if(!result.success){

            alert(result.message);

            return;

        }

        const user = result.data;

        document.getElementById("name").value =
            user.name || "";

        document.getElementById("email").value =
            user.email || "";

        document.getElementById("phone").value =
            user.phone || "";

        document.getElementById("address").value =
            user.address || "";

        document.getElementById("gender").value =
            user.gender || "";

        document.getElementById("preferences").value =
            user.preferences || "";

    }

    catch(error){

        console.log(error);

    }

}

loadProfile();


// ============================
// Update Profile
// ============================

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const profile={

        name:
        document.getElementById("name").value,

        phone:
        document.getElementById("phone").value,

        address:
        document.getElementById("address").value,

        gender:
        document.getElementById("gender").value,

        preferences:
        document.getElementById("preferences").value

    };

    try{

        const response=await fetch(

            `${BASE_URL}/users/profile`,

            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },

                body:JSON.stringify(profile)

            }

        );

        const result=await response.json();

        console.log(result);

        alert(result.message);

    }

    catch(error){

        console.log(error);

    }

});