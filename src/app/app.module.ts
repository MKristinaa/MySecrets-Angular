import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlertityService } from './services/alertity.service';
import { UserServiceService } from './services/user-service.service';
import { User_loginComponent } from './user/user_login/user_login.component';
import { User_registerComponent } from './user/user_register/user_register.component';
import { Nav_barComponent } from './nav_bar/nav_bar.component';
import { DataTableComponent } from './table/data-table/data-table.component';
import { AddToTableComponent } from './table/add-to-table/add-to-table.component';
import { InformationService } from './services/information.service';
import { ExportTXTService } from './services/ExportTXT.service';

const appRoutes: Routes = [
  {path: '', component: User_loginComponent},
  {path: 'user/register', component: User_registerComponent},
  {path: 'list', component: DataTableComponent},
  {path: 'add', component: AddToTableComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    User_loginComponent,
    User_registerComponent,
    Nav_barComponent,
    DataTableComponent,
    AddToTableComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FormsModule


  ],
  providers: [
    UserServiceService,
    AlertityService,
    InformationService,
    ExportTXTService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
