import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { Listener } from 'selenium-webdriver';
import { HomeComponent } from './home/home.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/home', pathMatch:'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponent = [ListComponent, HomeComponent,AddemployeeComponent];
