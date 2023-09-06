import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "../landing-page/landing-page.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {AuthorsComponent} from "../dashboard/authors/authors.component";
import {HomeComponent} from "../dashboard/home/home.component";
import {CategoriesComponent} from "../dashboard/categories/categories.component";
import {UserPanelComponent} from "../dashboard/user-panel/user-panel.component";
import {PlaylistsComponent} from "../dashboard/playlists/playlists.component";
import {SongComponent} from "../dashboard/song/component/song.component";

const routes: Routes = [
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'authors', component: AuthorsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'user-panel', component: UserPanelComponent },
      { path: 'playlists', component: PlaylistsComponent },
      { path: ':authorName', component: SongComponent },
    ],},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

}
