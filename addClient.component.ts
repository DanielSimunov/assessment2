//
//
//          Assessment Part 2
//
//
// Add Client
import { Component } from '@angular/core';
import { ClientService, Client } from './services/client.service';

@Component({
    templateUrl: './addClient.component.html',
    styleUrls: ['./app.component.css']
})

export class AddClientComponent {
    clients: Client[] = []

    constructor(private clientService : ClientService) {
        this.clients = this.clientService.getClients();
    }

    addName: string = "";
    addDob: Date = new Date();
    addGender: string = "";
    addProgram: string = "";
    addContact: string = "";
    addJoinDate: Date = new Date();
    addEndDate: Date = new Date();
    addNotes: string = "";
    addVip: boolean = false;

    onSubmit(form: any): void {
        if (form.valid) {
            // Get the last clientID number
        let lastId = 0;
        if (this.clientService.getClients().length > 0) {
            lastId = Math.max(...this.clients.map(client => client.clientID));
        }

        let newId = lastId + 1;

        const newClient: Client = {
            clientID: newId, 
            name: this.addName, 
            dob: new Date(this.addDob),
            gender: this.addGender,
            program: this.addProgram,
            contact: this.addContact,
            joinDate: new Date (this.addJoinDate),
            endDate: new Date (this.addEndDate),
            notes: this.addNotes,
            isVIP: this.addVip
        };

        this.clientService.addClient(newClient);
        alert("New client created")
        form.reset();
        } else {
            alert("Please fill all inputs")
        }
    }
}