import {Component} from '@angular/core';
import {SongModel} from "../models/song.model";
import {MatDialog} from "@angular/material/dialog";
import {CategoryModel} from "../models/category.model";
import {SharedService} from "../services/shared/shared.service";
import {AuthorModel} from "../models/author.model";
import {NewAuthorComponent} from "./management-panel/new/new-author/new-author.component";
import {AddDialogModel} from "../models/add-dialog.model";
import {FilterByComponent} from "./song/filter-by/filter-by.component";
import {SongService} from "./song/song.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn!: boolean;

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService) {
    this.sharedService.filterStatus=false;


   if (this.songs.length < 1){
     songService.getSongs().then(()=> {
       this.songs = this.sharedService.sharedSongsArray;
     });
     songService.getCategories();
     songService.getAuthors();
   }
    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");

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
      data: this.songs
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      this.songs=res;
      }
    })
  }
  removeFilters(){
    this.songs=this.songService.songsTemp;
    this.sharedService.filterStatus=false;
  }


}
