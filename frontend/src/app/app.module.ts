import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminRoutingModule } from "./admin/admin-routing.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ListItemComponent } from './dashboard/song/song-list/song-list-item/list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewSongComponent } from './dashboard/song/new-song/new-song.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatLegacyCardModule} from "@angular/material/legacy-card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { NewAuthorComponent } from './dashboard/authors/new-author/new-author.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { ConfirmDialogComponent } from './dashboard/song/delete-confirm-dialog/confirm-dialog.component';
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthorsComponent } from './dashboard/authors/authors.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthorCardComponent } from './dashboard/authors/author-card/author-card.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CategoryItemComponent } from './dashboard/categories/category-item/category-item.component';
import { DeleteAuthorDialogComponent } from './dashboard/authors/delete-author-dialog/delete-author-dialog.component';
import { UserPanelComponent } from './dashboard/user-panel/user-panel.component';
import { SongCardComponent } from './dashboard/song/song-card/song-card.component';
import { PlaylistsComponent } from './dashboard/playlists/playlists.component';
import { SongComponent } from './dashboard/song/component/song.component';
import { ShowPlaylistComponent } from './dashboard/playlists/show-playlist/show-playlist.component';
import { PlaylistCardComponent } from './dashboard/playlists/playlist-card/playlist-card.component';
import { AddPlaylistDialogComponent } from './dashboard/playlists/add-playlist-dialog/add-playlist-dialog.component';
import {MatListModule} from "@angular/material/list";
import { AddSongToPlaylistComponent } from './dashboard/playlists/add-song-to-playlist/add-song-to-playlist.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import { EditSongComponent } from './dashboard/song/edit-song/edit-song.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ListItemComponent,
    NewSongComponent,
    NewAuthorComponent,
    ConfirmDialogComponent,
    SidebarComponent,
    AuthorsComponent,
    HomeComponent,
    AuthorCardComponent,
    CategoriesComponent,
    CategoryItemComponent,
    DeleteAuthorDialogComponent,
    UserPanelComponent,
    SongCardComponent,
    PlaylistsComponent,
    SongComponent,
    ShowPlaylistComponent,
    PlaylistCardComponent,
    AddPlaylistDialogComponent,
    AddSongToPlaylistComponent,
    EditSongComponent


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
        FormsModule,
        ClipboardModule,
        MatIconModule,
        MatRadioModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
