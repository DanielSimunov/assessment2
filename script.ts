/* 

        Assessment Part 1


*/
// Client data structure
interface Client {
    clientID: number,
    name: string,
    dob: Date,
    gender: "Female" | "Male" | "Unspecified",
    program: "Fat Loss" | "Senior Fitness" | "Muscle Gain" | "Pre/Postnatal Fitness" | "Overall Fitness",
    contact: string,
    joinDate: Date,
    endDate: Date,
    notes?: string,
    isVIP: boolean
}

// Initialise Client array
let clients: Client[] = [
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
function addClient(event: Event): void {
    event.preventDefault(); // Prevent the form from refreshing the page

    const name = (document.getElementById("client-name") as HTMLInputElement).value;
    const dob = new Date((document.getElementById("client-dob") as HTMLInputElement).value);
    const gender = (document.getElementById("client-gender") as HTMLSelectElement).value as "Female" | "Male" | "Unspecified";
    const program = (document.getElementById("client-program") as HTMLSelectElement).value as "Fat Loss" | "Senior Fitness" | "Muscle Gain" | "Pre/Postnatal Fitness" | "Overall Fitness";
    const contact = (document.getElementById("client-contact") as HTMLInputElement).value;
    const joinDate = new Date((document.getElementById("client-joined") as HTMLInputElement).value);
    const endDate = new Date((document.getElementById("client-ending") as HTMLInputElement).value);
    const notes = (document.getElementById("client-notes") as HTMLTextAreaElement).value;
    const isVIP = (document.getElementById("client-vip") as HTMLInputElement).checked;

    // Get the length of client ID then add 1
    const clientID = clients.length + 1

    const newClient: Client = {clientID, name, dob, gender, program, contact, joinDate, endDate, notes, isVIP };
    console.log(newClient);
    
    clients.push(newClient);
    displayClients(clients);
}

// Event listener for submit button
document.getElementById("submit-button")?.addEventListener("click", addClient)

// Display all clients
function displayClients(clientList: Client[]): void {
    const table = document.getElementById("client-table") as HTMLTableElement;
    const tbody = table.querySelector("tbody");
    if (tbody) {
        tbody.innerHTML = ""; // Clear only the rows, keeping the header
    } 

    clientList.forEach(client => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = `${client.clientID}`;
        row.insertCell(1).textContent = `${client.name}`;
        row.insertCell(2).textContent = `${client.dob.toLocaleDateString()}`;
        row.insertCell(3).textContent = `${client.gender}`;
        row.insertCell(4).textContent = `${client.program}`;
        row.insertCell(5).textContent = `${client.contact}`;
        row.insertCell(6).textContent = `${client.joinDate.toLocaleDateString()}`;
        row.insertCell(7).textContent = `${client.endDate.toLocaleDateString()}`;
        row.insertCell(8).textContent = `${client.notes || ""}`;
        row.insertCell(9).textContent = `${client.isVIP ? "VIP" : "Regular"}`;

        // Add edit and delete button
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        row.insertCell(10).appendChild(deleteButton);
        row.insertCell(10).appendChild(editButton);

        // Add event listener to the delete button
        deleteButton.addEventListener("click", () => {
            showDeleteModal(client.clientID);  // Show the modal when delete button is clicked
        });

        // Add even listener to the edit button
        editButton.addEventListener("click", () => {
            editClient(row, client);
        });
    });
}

// Search Clients by ID
function searchClick(): void {
    const searchInput = document.getElementById("searchID") as HTMLInputElement;
    const id = parseInt(searchInput.value, 10); // Convert the input value to a number

    // Call the search function with the ID from the input
    const client = searchClientByID(id);

    if (client) {
        displayClients([client]);
    } else {
        displayClients(clients); // Do nothing
    }

}

function searchClientByID(id:number): Client | undefined {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].clientID === id) {
            return clients[i];
        };
    };
}

// Display VIP clients
function displayVIPClients(): void {
    const vipClients: Client[] = [];
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].isVIP) {
            vipClients.push(clients[i]);
        }
    }
    displayClients(vipClients);
}

// Edit client info
function editClient(row:HTMLTableRowElement, client: Client): void {
    // Loop through each cell in the row and make it editable
    for (let i = 0; i < row.cells.length - 1; i++) {  // Exclude the last cell (which has buttons)
        const cell = row.cells[i];
        const originalText = cell.textContent || "";  // Get current text content of the cell
        
        // Skip creating an input for clientID
        if (i === 0) {
            cell.textContent = `${client.clientID}`; // Keep clientID as non-editable text
            continue;
        }

        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;  // Set input value to the current text content
        cell.innerHTML = "";  // Clear the cell
        cell.appendChild(input);  // Add the input field to the cell
    }

    // Change the Edit button to Save and Cancel buttons
    const editButtonCell = row.cells[row.cells.length - 2]; // Edit button cell
    editButtonCell.innerHTML = "";  // Clear the Edit button cell
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    editButtonCell.appendChild(saveButton);
    editButtonCell.appendChild(cancelButton);

    // Save the edits
    saveButton.addEventListener("click", () => {
        saveClientEdits(row, client);
    });

    // Cancel the edit
    cancelButton.addEventListener("click", () => {
        cancelClientEdits(row, client);
    });
}

// Save clients edited info
function saveClientEdits(row: HTMLTableRowElement, client: Client): void {
    // Update the client object fields based on input values
    const updatedValues: (string | boolean)[] = [];
    for (let i = 1; i < row.cells.length - 2; i++) {  // Start at 1 to skip the ID cell, exclude buttons
        const cell = row.cells[i];
        const input = cell.querySelector("input") as HTMLInputElement | null;
        updatedValues.push(input ? input.value : (cell.textContent || ""));
    }

    // Apply the updated values to the client object
    client.name = updatedValues[0] as string;
    client.dob = new Date(updatedValues[1] as string);
    client.gender = updatedValues[2] as "Female" | "Male" | "Unspecified";
    client.program = updatedValues[3] as "Fat Loss" | "Senior Fitness" | "Muscle Gain" | "Pre/Postnatal Fitness" | "Overall Fitness";
    client.contact = updatedValues[4] as string;
    client.joinDate = new Date(updatedValues[5] as string);
    client.endDate = new Date(updatedValues[6] as string);
    client.notes = updatedValues[7] as string;
    client.isVIP = updatedValues[8] === "VIP";

    // Reset each cell to display updated client information
    row.cells[0].textContent = `${client.clientID}`;  // Set client ID as text, not input
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
    const buttonCell = row.cells[10];
    buttonCell.innerHTML = "";  // Clear the cell
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        editClient(row, client);
    });
    buttonCell.appendChild(editButton);
}

// Helper function to map cell index to client field
function getClientFieldName(index: number): keyof Client | null {
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
function cancelClientEdits(row: HTMLTableRowElement, client: Client): void {
    // Reset the cells back to the original data
    for (let i = 0; i < row.cells.length - 2; i++) {  // Exclude last two cells
        const cell = row.cells[i];
        cell.innerHTML = client[getClientFieldName(i) || ""] as string;  // Set original text
    }

    // Refresh the table without saving
    displayClients(clients);
}

// Delete client functions --------------------------------
// Define currentClientID globally so its accessable accross functions
let currentClientID: number | null = null;

function showDeleteModal(clientID:number): void {
    currentClientID = clientID;
    const modal = document.getElementById("delete-modal") as HTMLDivElement;
    modal.style.display = "flex";
}

// Close modal
function closeDeleteModal(): void {
    const modal = document.getElementById("delete-modal") as HTMLDivElement;
    modal.style.display = "none";
}

// Function to confirm the deletion
function confirmDelete(): void {
    if (currentClientID !== null) {
        // Loop through clients and find the client with the matching clientID
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].clientID === currentClientID) {
                // Remove the client from the array using splice
                clients.splice(i, 1);
                break;
            };
        };
        displayClients(clients);  // Refresh the table of clients
    };
    closeDeleteModal();  // Close the modal after deletion
}

// Load clients
document.addEventListener("DOMContentLoaded", () => {
    // Call your function to initialize the client data
    displayClients(clients);
});

// Function to cancel the deletion
function cancelDelete():void {
    closeDeleteModal();
}

// Event listeners for delete and cancel buttons
document.getElementById("confirm-delete")?.addEventListener("click", confirmDelete);
document.getElementById("cancel-delete")?.addEventListener("click", cancelDelete);

function addDeleteButtonListener(deleteButton: HTMLElement, clientID: number): void {
    deleteButton.addEventListener("click", () => {
        showDeleteModal(clientID);  // Show the modal when delete button is clicked
    });
}