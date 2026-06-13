// Load data from LocalStorage

let clients = JSON.parse(localStorage.getItem("clients")) || [];

displayClients();
updateDashboard();

// -----------------------------
// Navigation
// -----------------------------

function showSection(sectionId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {
        page.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

}

// -----------------------------
// Add Client
// -----------------------------

function addClient() {

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let zodiac = document.getElementById("zodiac").value.trim();
    let status = document.getElementById("status").value;

    if (name === "" || phone === "" || zodiac === "") {
        alert("Please fill all fields");
        return;
    }

    let client = {
        id: Date.now(),
        name: name,
        phone: phone,
        zodiac: zodiac,
        status: status
    };

    clients.push(client);

    saveData();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("zodiac").value = "";
    document.getElementById("status").value = "Pending";

    displayClients();
    updateDashboard();

    alert("Client Added Successfully");

    showSection("manageClients");
}

// -----------------------------
// Display Clients
// -----------------------------

function displayClients() {

    let clientList = document.getElementById("clientList");

    clientList.innerHTML = "";

    if (clients.length === 0) {

        clientList.innerHTML = `
        <div class="client-card">
            <h3>No Clients Found</h3>
            <p>Add a client to get started.</p>
        </div>
        `;

        return;
    }

    clients.forEach(function (client) {

        clientList.innerHTML += `

        <div class="client-card">

            <h3>${client.name}</h3>

            <p>📞 ${client.phone}</p>

            <p>🔮 ${client.zodiac}</p>

            <span class="status">
                ${client.status}
            </span>

            <button
                class="delete-btn"
                onclick="deleteClient(${client.id})">

                Delete

            </button>

        </div>

        `;

    });

}

// -----------------------------
// Delete Client
// -----------------------------

function deleteClient(id) {

    let confirmDelete = confirm("Delete this client?");

    if (!confirmDelete) {
        return;
    }

    clients = clients.filter(function (client) {
        return client.id !== id;
    });

    saveData();
    displayClients();
    updateDashboard();

}

// -----------------------------
// Search Client
// -----------------------------

function searchClient() {

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".client-card");

    cards.forEach(function (card) {

        let text = card.innerText.toLowerCase();

        if (text.includes(input)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }

    });

}

// -----------------------------
// Dashboard
// -----------------------------

function updateDashboard() {

    let total = clients.length;

    let pending = clients.filter(function (client) {
        return client.status === "Pending";
    }).length;

    let completed = clients.filter(function (client) {
        return client.status === "Completed";
    }).length;

    document.getElementById("totalClients").innerText = total;

    document.getElementById("pendingClients").innerText = pending;

    document.getElementById("completedClients").innerText = completed;

}

// -----------------------------
// Save LocalStorage
// -----------------------------

function saveData() {

    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );

}