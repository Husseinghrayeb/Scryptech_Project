import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EmployeeService } from './shared/employee.service';
import { HttpModule } from '../../node_modules/@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StorageServiceModule} from 'angular-webstorage-service';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routingComponent,
    AddemployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule,
    StorageServiceModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
