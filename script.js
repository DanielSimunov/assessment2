/* 

        Assessment Part 1


*/
var _a, _b, _c;
// Initialise Client array
var clients = [
    {
        clientID: 1,
        name: "Jane Doe",
        dob: new Date("1990-01-01"),
        gender: "Female",
        program: "Fat Loss",
        contact: "0412345678",
        joinDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        notes: "Has a knee issue",
        isVIP: true
    },
    {
        clientID: 2,
        name: "John Smith",
        dob: new Date("1980-03-04"),
        gender: "Male",
        program: "Fat Loss",
        contact: "0412345678",
        joinDate: new Date("2024-02-01"),
        endDate: new Date("2024-10-31"),
        notes: "",
        isVIP: false
    },
    {
        clientID: 3,
        name: "Michael Ford",
        dob: new Date("1996-06-11"),
        gender: "Male",
        program: "Muscle Gain",
        contact: "0412345678",
        joinDate: new Date("2024-03-10"),
        endDate: new Date("2024-06-10"),
        notes: "",
        isVIP: true
    }
];
// Add new client function
function addClient(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    var name = document.getElementById("client-name").value;
    var dob = new Date(document.getElementById("client-dob").value);
    var gender = document.getElementById("client-gender").value;
    var program = document.getElementById("client-program").value;
    var contact = document.getElementById("client-contact").value;
    var joinDate = new Date(document.getElementById("client-joined").value);
    var endDate = new Date(document.getElementById("client-ending").value);
    var notes = document.getElementById("client-notes").value;
    var isVIP = document.getElementById("client-vip").checked;
    // Get the length of client ID then add 1
    var clientID = clients.length + 1;
    var newClient = { clientID: clientID, name: name, dob: dob, gender: gender, program: program, contact: contact, joinDate: joinDate, endDate: endDate, notes: notes, isVIP: isVIP };
    console.log(newClient);
    clients.push(newClient);
    displayClients(clients);
}
// Event listener for submit button
(_a = document.getElementById("submit-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addClient);
// Display all clients
function displayClients(clientList) {
    var table = document.getElementById("client-table");
    var tbody = table.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = ""; // Clear only the rows, keeping the header
    }
    clientList.forEach(function (client) {
        var row = tbody.insertRow();
        row.insertCell(0).textContent = "".concat(client.clientID);
        row.insertCell(1).textContent = "".concat(client.name);
        row.insertCell(2).textContent = "".concat(client.dob.toLocaleDateString());
        row.insertCell(3).textContent = "".concat(client.gender);
        row.insertCell(4).textContent = "".concat(client.program);
        row.insertCell(5).textContent = "".concat(client.contact);
        row.insertCell(6).textContent = "".concat(client.joinDate.toLocaleDateString());
        row.insertCell(7).textContent = "".concat(client.endDate.toLocaleDateString());
        row.insertCell(8).textContent = "".concat(client.notes || "");
        row.insertCell(9).textContent = "".concat(client.isVIP ? "VIP" : "Regular");
        // Add edit and delete button
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        row.insertCell(10).appendChild(deleteButton);
        row.insertCell(10).appendChild(editButton);
        // Add event listener to the delete button
        deleteButton.addEventListener("click", function () {
            showDeleteModal(client.clientID); // Show the modal when delete button is clicked
        });
        // Add even listener to the edit button
        editButton.addEventListener("click", function () {
            editClient(row, client);
        });
    });
}
// Search Clients by ID
function searchClick() {
    var searchInput = document.getElementById("searchID");
    var id = parseInt(searchInput.value, 10); // Convert the input value to a number
    // Call the search function with the ID from the input
    var client = searchClientByID(id);
    if (client) {
        displayClients([client]);
    }
    else {
        displayClients(clients); // Do nothing
    }
}
function searchClientByID(id) {
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].clientID === id) {
            return clients[i];
        }
        ;
    }
    ;
}
// Display VIP clients
function displayVIPClients() {
    var vipClients = [];
    for (var i = 0; i < clients.length; i++) {
        if (clients[i].isVIP) {
            vipClients.push(clients[i]);
        }
    }
    displayClients(vipClients);
}
// Edit client info
function editClient(row, client) {
    // Loop through each cell in the row and make it editable
    for (var i = 0; i < row.cells.length - 1; i++) { // Exclude the last cell (which has buttons)
        var cell = row.cells[i];
        var originalText = cell.textContent || ""; // Get current text content of the cell
        // Skip creating an input for clientID
        if (i === 0) {
            cell.textContent = "".concat(client.clientID); // Keep clientID as non-editable text
            continue;
        }
        var input = document.createElement("input");
        input.type = "text";
        input.value = originalText; // Set input value to the current text content
        cell.innerHTML = ""; // Clear the cell
        cell.appendChild(input); // Add the input field to the cell
    }
    // Change the Edit button to Save and Cancel buttons
    var editButtonCell = row.cells[row.cells.length - 2]; // Edit button cell
    editButtonCell.innerHTML = ""; // Clear the Edit button cell
    var saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    var cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    editButtonCell.appendChild(saveButton);
    editButtonCell.appendChild(cancelButton);
    // Save the edits
    saveButton.addEventListener("click", function () {
        saveClientEdits(row, client);
    });
    // Cancel the edit
    cancelButton.addEventListener("click", function () {
        cancelClientEdits(row, client);
    });
}
// Save clients edited info
function saveClientEdits(row, client) {
    // Update the client object fields based on input values
    var updatedValues = [];
    for (var i = 1; i < row.cells.length - 2; i++) { // Start at 1 to skip the ID cell, exclude buttons
        var cell = row.cells[i];
        var input = cell.querySelector("input");
        updatedValues.push(input ? input.value : (cell.textContent || ""));
    }
    // Apply the updated values to the client object
    client.name = updatedValues[0];
    client.dob = new Date(updatedValues[1]);
    client.gender = updatedValues[2];
    client.program = updatedValues[3];
    client.contact = updatedValues[4];
    client.joinDate = new Date(updatedValues[5]);
    client.endDate = new Date(updatedValues[6]);
    client.notes = updatedValues[7];
    client.isVIP = updatedValues[8] === "VIP";
    // Reset each cell to display updated client information
    row.cells[0].textContent = "".concat(client.clientID); // Set client ID as text, not input
    row.cells[1].textContent = client.name;
    row.cells[2].textContent = client.dob.toLocaleDateString();
    row.cells[3].textContent = client.gender;
    row.cells[4].textContent = client.program;
    row.cells[5].textContent = client.contact;
    row.cells[6].textContent = client.joinDate.toLocaleDateString();
    row.cells[7].textContent = client.endDate.toLocaleDateString();
    row.cells[8].textContent = client.notes || "";
    row.cells[9].textContent = client.isVIP ? "VIP" : "Regular";
    // Replace Save and Cancel with the Edit button
    var buttonCell = row.cells[10];
    buttonCell.innerHTML = ""; // Clear the cell
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        editClient(row, client);
    });
    buttonCell.appendChild(editButton);
}
// Helper function to map cell index to client field
function getClientFieldName(index) {
    switch (index) {
        case 0: return "clientID";
        case 1: return "name";
        case 2: return "dob";
        case 3: return "gender";
        case 4: return "program";
        case 5: return "contact";
        case 6: return "joinDate";
        case 7: return "endDate";
        case 8: return "notes";
        case 9: return "isVIP";
        default: return null;
    }
}
// Cancel editing the client data
function cancelClientEdits(row, client) {
    // Reset the cells back to the original data
    for (var i = 0; i < row.cells.length - 2; i++) { // Exclude last two cells
        var cell = row.cells[i];
        cell.innerHTML = client[getClientFieldName(i) || ""]; // Set original text
    }
    // Refresh the table without saving
    displayClients(clients);
}
// Delete client functions --------------------------------
// Define currentClientID globally so its accessable accross functions
var currentClientID = null;
function showDeleteModal(clientID) {
    currentClientID = clientID;
    var modal = document.getElementById("delete-modal");
    modal.style.display = "flex";
}
// Close modal
function closeDeleteModal() {
    var modal = document.getElementById("delete-modal");
    modal.style.display = "none";
}
// Function to confirm the deletion
function confirmDelete() {
    if (currentClientID !== null) {
        // Loop through clients and find the client with the matching clientID
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].clientID === currentClientID) {
                // Remove the client from the array using splice
                clients.splice(i, 1);
                break;
            }
            ;
        }
        ;
        displayClients(clients); // Refresh the table of clients
    }
    ;
    closeDeleteModal(); // Close the modal after deletion
}
// Load clients
document.addEventListener("DOMContentLoaded", function () {
    // Call your function to initialize the client data
    displayClients(clients);
});
// Function to cancel the deletion
function cancelDelete() {
    closeDeleteModal();
}
// Event listeners for delete and cancel buttons
(_b = document.getElementById("confirm-delete")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", confirmDelete);
(_c = document.getElementById("cancel-delete")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", cancelDelete);
function addDeleteButtonListener(deleteButton, clientID) {
    deleteButton.addEventListener("click", function () {
        showDeleteModal(clientID); // Show the modal when delete button is clicked
    });
}
