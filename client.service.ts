//
//
//          Assessment Part 2
//
//
// Client Service File
import { Injectable } from "@angular/core";

// Client data structure
export interface Client {
    clientID: number,
    name: string,
    dob: Date | string,
    gender: string,
    program: string,
    contact: string,
    joinDate: Date | string,
    endDate: Date | string,
    notes?: string,
    isVIP: boolean
}
@Injectable()
export class ClientService {
    // Global array of clients
    private static clients: Client[] = [
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
            name: "Alex Ford",
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

    getClients(): Client[] {
        return ClientService.clients;
    }

    // Method to count active clients
    getNumberOfClients(): number {
        return ClientService.clients.length;
    }

    // Method to count VIP clients
    getVipClients(): number {
        return ClientService.clients.filter(client => client.isVIP).length;
    }

    // Method to search client by ID
    searchById(clientID: number): Client | undefined {
        return ClientService.clients.find((client) => client.clientID === clientID);
    }

    // Method to add a new client
    addClient(newClient: Client): void {
        ClientService.clients.push(newClient);
    }

    // Method to delete client
    deleteClient(clientID: number): void {
        ClientService.clients = ClientService.clients.filter(client => client.clientID !== clientID);
    }
}

