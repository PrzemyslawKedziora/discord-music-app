import { Injectable } from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {NewAuthorComponent} from "./new-author/new-author.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private http: HttpClient) { }

  getAuthors(): Observable<any> {
    return this.http.get('https://discord-music-app-backend.vercel.app/api/authors/all');
  }

  addArtist() {
    const dialogRef = this.dialog.open(NewAuthorComponent, {
      disableClose: true,
      width: '100vw',
      data: this.artists
    });
  }
}
