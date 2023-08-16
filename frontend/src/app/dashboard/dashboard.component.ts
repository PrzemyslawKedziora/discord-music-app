import {Component} from '@angular/core';
import {SongModel} from "../models/song.model";
import axios from "axios";
import {MatDialog} from "@angular/material/dialog";
import {NewSongComponent} from "./management-panel/new/new-song/new-song.component";
import {CategoryModel} from "../models/category.model";
import {SharedService} from "../services/shared/shared.service";
import {AuthorModel} from "../models/author.model";
import {NewAuthorComponent} from "./management-panel/new/new-author/new-author.component";
import {AddDialogModel} from "../models/add-dialog.model";
import {FilterByComponent} from "../components/filter-by/filter-by.component";

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
      this.songsTemp = this.songs;
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
        arTemp=arTemp.sort((a,b)=> a.name.localeCompare(b.name));
        this.artists = arTemp;
        this.dialogData.author = this.artists;
        this.sharedService.sharedArtistsArray = this.artists;


      }
    );
    this.sharedService.sharedSongsArray = this.songs;
    this.sharedService.getNewAuthor().subscribe((newAuthor) => {
      if (newAuthor) {
        this.artists.push(newAuthor);
      }
    });
    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");

  }

  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn!: boolean;

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

  openFilterByDialog() {
    const dialogRef = this.dialog.open(FilterByComponent, {
      disableClose: true,
      width:'50vw',
      data: this.songsTemp
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      this.songs=res;
      }
    })
  }


}
