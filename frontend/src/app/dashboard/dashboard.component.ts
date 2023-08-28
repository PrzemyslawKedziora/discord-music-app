import {Component, OnInit} from '@angular/core';
import {SongModel} from "../models/song.model";
import {MatDialog} from "@angular/material/dialog";
import {CategoryModel} from "../models/category.model";
import {SharedService} from "../services/shared/shared.service";
import {AuthorModel} from "../models/author.model";
import {NewAuthorComponent} from "./authors/new-author/new-author.component";
import {AddDialogModel} from "../models/add-dialog.model";
import {FilterByComponent} from "./song/filter-by/filter-by.component";
import {SongService} from "./song/song.service";
import {AuthorService} from "./authors/author.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn!: boolean;
  authorID!: string;
  filteredSongs: SongModel[] = [];
  author: AuthorModel | undefined;

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService,
              private authorService: AuthorService,
              private route : ActivatedRoute) {
    this.sharedService.filterStatus=false;



    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");


  }

  ngOnInit() {
    if (this.songs.length < 1){
      this.songService.getSongs().then(()=> {
        this.songs = this.sharedService.sharedSongsArray;
      });
      this.songService.getCategories();
      this.authorService.getAuthors();
    }

    this.route.paramMap.subscribe(params => {
      this.authorID = params.get('authorName') || '';
      if (this.authorID == '') return;
      else {
        this.authorService.getAuthors().then(() => {
          this.songs = this.songs.filter(song => song.authorID.name == this.authorID);
        });
      }
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
