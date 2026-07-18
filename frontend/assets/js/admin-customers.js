const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if(!token || user.role !== "admin"){

    window.location.href="login.html";

}

let customers=[];

async function loadCustomers(){

    try{

        const response = await fetch(

            `${BASE_URL}/admin/customers`,

            {

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        console.log(data);

        customers=data.customers;

        displayCustomers(customers);

    }

    catch(err){

        console.log(err);

    }

}

function displayCustomers(list){

    const table =
    document.getElementById("customerTable");

    table.innerHTML="";

    list.forEach(customer=>{

        table.innerHTML+=`

        <tr>

            <td>${customer.id}</td>

            <td>${customer.name}</td>

            <td>${customer.email}</td>

            <td>${customer.phone}</td>

            <td>${customer.gender || "-"}</td>

            <td>${customer.address || "-"}</td>

            <td>${customer.preferences || "-"}</td>

        </tr>

        `;

    });

}

document.getElementById("search")

.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const filtered=

    customers.filter(customer=>

        customer.name.toLowerCase().includes(value)

        ||

        customer.email.toLowerCase().includes(value)

    );

    displayCustomers(filtered);

});

loadCustomers();