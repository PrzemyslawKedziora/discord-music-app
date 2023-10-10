import { Injectable } from '@angular/core';
import axios from "axios";
import {AuthorModel} from "../../models/author.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {NewAuthorComponent} from "./new-author/new-author.component";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(public dialog: MatDialog,
              public sharedService: SharedService) { }

  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};

  getAuthors(): Promise<void> {
    return axios.get('https://discord-music-app-backend.vercel.app/api/authors/all').then(
      (res) => {
        let arTemp: AuthorModel[] = [];
        for (let i = 0; i < res.data.length; i++) {
          arTemp.push(res.data[i]);
        }
        arTemp = arTemp.sort((a, b) => a.name.localeCompare(b.name));
        this.artists = arTemp;
        this.dialogData.author = this.artists;
        this.sharedService.sharedArtistsArray = this.artists;
      });
  }

  addArtist() {
    const dialogRef = this.dialog.open(NewAuthorComponent, {
      disableClose: true,
      width: '100vw',
      data: this.artists
    });
  }
}
