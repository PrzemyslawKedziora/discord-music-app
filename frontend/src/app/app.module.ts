import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminRoutingModule } from "./admin/admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ListItemComponent } from './dashboard/song-list/song-list-item/list-item.component';
import { ManagementPanelComponent } from './dashboard/management-panel/management-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewSongComponent } from './dashboard/management-panel/new/new-song/new-song.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatLegacyCardModule} from "@angular/material/legacy-card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { SnackBarComponent } from './components/snack-bar/song/snack-bar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { NewAuthorComponent } from './dashboard/management-panel/new/new-author/new-author.component';
import {AuthorSnackBarComponent} from "./components/snack-bar/author/author-snack-bar.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ListItemComponent,
    ManagementPanelComponent,
    NewSongComponent,
    SnackBarComponent,
    NewAuthorComponent,
    AuthorSnackBarComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatLegacyCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
