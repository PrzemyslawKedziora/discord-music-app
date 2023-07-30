import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "../landing-page/landing-page.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";

const routes: Routes = [
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
