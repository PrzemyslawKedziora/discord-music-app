import {Component} from '@angular/core';
import { SongModel} from "../models/song.model";
import axios from "axios";
import {MatDialog} from "@angular/material/dialog";
import {NewSongComponent} from "./management-panel/new/new-song/new-song.component";
import {CategoryModel} from "../models/category.model";
import {SharedService} from "../services/shared/shared.service";
import {AuthorModel} from "../models/author.model";
import {NewAuthorComponent} from "./management-panel/new/new-author/new-author.component";
import {AddDialogModel} from "../models/add-dialog.model";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  constructor(public dialog: MatDialog,
              private sharedService: SharedService) {


    axios.get('http://localhost:4100/api/songs/all').then((response)=> {
      for (let i=0;i<response.data.length;i++){
        this.songs.push(response.data[i]);
      }
    });
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
    axios.get('http://localhost:4100/api/authors/all').then(
      (res) => {
        let arTemp:AuthorModel[]=[];
        for (let i = 0; i < res.data.length; i++) {
          arTemp.push(res.data[i]);
        }
        this.artists = arTemp;
        this.dialogData.author = this.artists;


      }
    );
    this.sharedService.isLoggedInStatus=this.isLoggedIn;
    this.sharedService.sharedSongsArray = this.songs;
  }

  tablica:string[]=['2','3'];
  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn: boolean=true;

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  addArtist(){
    const dialogRef = this.dialog.open(NewAuthorComponent, {
      disableClose: true,
      width:'100vw',
      data: this.artists
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
