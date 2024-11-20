//
//
//          Assessment Part 2
//
//
// Home
import { Component } from '@angular/core';
import { ClientService, Client } from './services/client.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./app.component.css']
})

export class HomeComponent {
    clients: Client[] = []

    constructor(private clientService : ClientService) {
        this.clients = this.clientService.getClients();
    }

    // Method to display number of active clients
  displayClientCount(): number {
    return this.clientService.getNumberOfClients();
  }

  // Method to display number of VIP clients
  displayVipCount(): number {
    return this.clientService.getVipClients();
  }

    // Delete confirmation modal
    isModalOpen: boolean = false; // Modal visibility
    clientToDelete: Client | null = null; // Client to delete

    openDeleteModal(clientID: number): void { // Open modal and set the client to delete
        this.isModalOpen = true;
        this.clientToDelete = this.clientService.getClients().find(client => client.clientID === clientID) || null;
    }

    closeDeleteModal(): void { // Close modal without deleting
        this.isModalOpen = false;
        this.clientToDelete = null;
    }

    deleteClient(): void { // Confirm deletion and delete the client
        if (this.clientToDelete != null) {
            this.clientService.deleteClient(this.clientToDelete.clientID);
            this.clients = this.clientService.getClients();
            this.closeDeleteModal()
        }
    }

    // Sort Clients
    selectedSort: string | null = "";

    sortClients(): void {
        switch (this.selectedSort) {
            case "id":
                // Copy the array, then sort the copy
                this.clients.sort((a, b) => a.clientID - b.clientID);
                break;
            case "name":
                this.clients.sort((a, b) => a.name.localeCompare(b.name));
                break;   
            case "oldest":
                this.clients.sort((a, b) => new Date(a.dob).getTime() - new Date(b.dob).getTime());
                break;
            case "newest":
                this.clients.sort((a, b) => new Date(b.dob).getTime() - new Date(a.dob).getTime());
                break;
            default:
                break;
        }
    }

    // Edit Client
    editingClient: Client | null = null;
    editingContext: "table" | "search" | null = null;

    editClient(client: Client, context: "table" | "search"): void {
        this.editingClient = {...client}; // Creates a copy of the client to edit
        this.editingContext = context;

        if (this.editingClient) {
            // Ensure dob is a Date object
            const dobDate = new Date(this.editingClient.dob);
            const joinDate = new Date(this.editingClient.joinDate);
            const endDate = new Date(this.editingClient.endDate);
            
            // Convert the Date object to an ISO string and extract the date part
            this.editingClient.dob = dobDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
            this.editingClient.joinDate = joinDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
            this.editingClient.endDate = endDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
        }
    }

    saveClient(): void {
        if (this.editingClient) {
            // Find the client in the array and update it
            const index = this.clients.findIndex(c => c.clientID === this.editingClient?.clientID);

            if (index !== -1) {
                this.clients[index] = {...this.editingClient};
            }

            this.cancelEdit();
        }
    }

    cancelEdit():void {
        this.editingClient = null;
    }
}