import { Injectable } from '@angular/core';
import axios from "axios";
import {CategoryModel} from "../../models/category.model";
import {AuthorModel} from "../../models/author.model";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {NewSongComponent} from "./new-song/new-song.component";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(public dialog: MatDialog,
              public sharedService: SharedService) { }

  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};

  getSongs(){
    axios.get('http://localhost:4100/api/songs/all').then((response)=> {
      for (let i=0;i<response.data.length;i++){
        this.songs.push(response.data[i]);
      }
      this.songsTemp = this.songs;
    });
    this.sharedService.sharedSongsArray = this.songs;
  }

  getCategories(){
    axios.get('http://localhost:4100/api/categories/all').then(
      (res) => {
        let ar:CategoryModel[]=[];
        for (let i = 0; i < res.data.length; i++) {
          ar.push(res.data[i]);
        }
        this.categories = ar;
        this.dialogData.category = this.categories;
      }
    );
  }

  getAuthors(){
    axios.get('http://localhost:4100/api/authors/all').then(
      (res) => {
        let arTemp:AuthorModel[]=[];
        for (let i = 0; i < res.data.length; i++) {
          arTemp.push(res.data[i]);
        }
        arTemp=arTemp.sort((a,b)=> a.name.localeCompare(b.name));
        this.artists = arTemp;
        this.dialogData.author = this.artists;
        this.sharedService.sharedArtistsArray = this.artists;
      });
  }

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
    });

  }


}
