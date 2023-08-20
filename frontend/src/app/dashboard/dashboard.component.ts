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

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService) {
    this.sharedService.filterStatus=false;


   songService.getSongs();
   songService.getCategories();
   songService.getAuthors();
    this.songs = this.sharedService.sharedSongsArray;
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
