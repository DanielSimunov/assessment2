//
//
//          Assessment Part 2
//
//
import { Component } from '@angular/core';
import { ClientService, Client } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clients : Client[] = []
  
  constructor(private clientService : ClientService) {}
}
