//
//
//          Assessment Part 2
//
//
// Search
import { Component } from '@angular/core';
import { ClientService, Client } from './services/client.service';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./app.component.css']
})

export class SearchComponent {
    clients: Client[] = []
    searchResult: Client | null = null;
    searchId: number | null = null;
    searchName: string | null = null;
    searchPerformed: boolean = false;

    constructor(private clientService : ClientService) {
        this.clients = this.clientService.getClients();
    }

    // Search method
    onSearch(): void {
        this.searchPerformed = true;
        if (this.searchId !== null) {
            const result = this.clientService.searchById(this.searchId);
            this.searchResult = result || null;
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
}