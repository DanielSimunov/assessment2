//
//
//          Assessment Part 2
//
//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Import components
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AddClientComponent } from './addClient.component';
import { SearchComponent } from './search.component';
import { BadUrlComponent } from './badUrl.component';
import { HelpComponent } from './help.component';

import { RouterModule, Routes } from '@angular/router';

// Import services
import { ClientService } from './services/client.service';

const routes : Routes = [
  {path : "home", component : HomeComponent},
  {path : "", redirectTo : "/home", pathMatch: "full"},
  {path : "addClient", component : AddClientComponent},
  {path : "search", component : SearchComponent},
  {path : "help", component : HelpComponent},
  {path : "**", component: BadUrlComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddClientComponent,
    SearchComponent,
    BadUrlComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
