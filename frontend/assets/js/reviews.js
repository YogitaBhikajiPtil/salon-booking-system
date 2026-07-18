// reviews.js

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if(!token){

    window.location.href="login.html";

}

let serviceId="";

async function loadAppointments() {

    try {

        const response = await fetch(

            `${BASE_URL}/appointments/my`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const result = await response.json();

        console.log(result);

        const select = document.getElementById("appointment");

        select.innerHTML = `<option value="">Select Appointment</option>`;

        if (!result.success) {

            alert(result.message);

            return;

        }

        if (!Array.isArray(result.data)) {

            console.log("Returned Data:", result.data);

            return;

        }

        result.data.forEach(app => {

            if (app.status !== "Completed") return;

            select.innerHTML += `

            <option
                value="${app.id}"
                data-service="${app.serviceId}">

                ${app.Service?.serviceName}
                (${app.appointmentDate})

            </option>

            `;

        });

    }

    catch (err) {

        console.log(err);

    }

}

document

.getElementById("appointment")

.addEventListener("change",function(){

    serviceId=

    this.options[this.selectedIndex]

    .dataset.service;

    loadReviews();

});

document

.getElementById("reviewForm")

.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const appointmentId=

    document.getElementById("appointment").value;

    const rating=

    document.getElementById("rating").value;

    const review=

    document.getElementById("review").value;

    const response=await fetch(

        `${BASE_URL}/reviews`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                appointmentId,

                rating,

                review

            })

        }

    );

    const data=await response.json();

    alert(data.message);

    document.getElementById("reviewForm").reset();

    loadReviews();

});

async function loadReviews(){

    if(!serviceId) return;

    const response=await fetch(

        `${BASE_URL}/reviews/service/${serviceId}`

    );

    const data=await response.json();

    const container=

    document.getElementById("reviewsContainer");

    container.innerHTML="";

    data.reviews.forEach(r=>{

        container.innerHTML+=`

        <div class="review-card">

            <h3>${r.User.name}</h3>

            <p>

            Rating :
            ⭐${r.rating}/5

            </p>

            <p>${r.review}</p>

            <p>

            Staff :

            ${r.Staff.name}

            </p>

            <div class="staffReply">

            <strong>

            Staff Reply

            </strong>

            <br>

            ${r.staffReply || "No reply yet"}

            </div>

            ${r.userId===user.id?

            `

            <button

            class="editBtn"

            onclick="editReview(${r.id},

            '${r.review}',

            ${r.rating})">

            Edit

            </button>

            <button

            class="deleteBtn"

            onclick="deleteReview(${r.id})">

            Delete

            </button>

            `

            :

            ""

            }

        </div>

        `;

    });

}

async function deleteReview(id){

    if(!confirm("Delete Review?")) return;

    const response=await fetch(

        `${BASE_URL}/reviews/${id}`,

        {

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data=await response.json();

    alert(data.message);

    loadReviews();

}

async function editReview(id,text,rating){

    const newRating=

    prompt("Rating (1-5)",rating);

    const newReview=

    prompt("Review",text);

    if(!newRating || !newReview) return;

    const response=await fetch(

        `${BASE_URL}/reviews/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                rating:newRating,

                review:newReview

            })

        }

    );

    const data=await response.json();

    console.log(response.status);
console.log(data);

    alert(data.message);

    loadReviews();

}

loadAppointments();