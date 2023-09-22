import { Component } from '@angular/core';
import {CategoryModel} from "../../../models/category.model";
import {AuthorModel} from "../../../models/author.model";
import {SongModel} from "../../../models/song.model";
import {AddDialogModel} from "../../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../../services/shared/shared.service";
import {SongService} from "../song.service";
import {AuthorService} from "../../authors/author.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../categories/category.service";
import {NewAuthorComponent} from "../../authors/new-author/new-author.component";
import {NewSongComponent} from "../new-song/new-song.component";
import {FilterByComponent} from "../filter-by/filter-by.component";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {

  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn!: boolean;
  authorID!: string;
  catID!: string;
  filteredSongs: SongModel[] = [];
  author: AuthorModel | undefined;
  botCommand:string='';

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService,
              private authorService: AuthorService,
              private route : ActivatedRoute,
              private categoryService: CategoryService) {
    this.sharedService.filterStatus=false;

    songService.getSongs().then(()=> {
      this.songs = this.sharedService.sharedSongsArray;
      this.songsTemp = this.songs;
    });
    categoryService.getCategories().then(()=> {
      this.categories = this.categoryService.categories;
      this.dialogData.category = this.categoryService.categories;
    });
    authorService.getAuthors().then(()=>{
      this.artists = this.sharedService.sharedArtistsArray;
    });
    this.initializeArtistsAsync().then(() => {
      this.route.paramMap.subscribe(params => {
        if (params.get('authorName') != 'music' && params.get('authorName')) {
          this.authorID = params.get('authorName') || '';
          if (this.authorService.artists.some(author => author.name === this.authorID)) {
            this.authorService.getAuthors().then(() => {
              this.songs = this.songs.filter(song =>
                song.authors.some(author => author.name === this.authorID)
              );
            });
          }
          else{
            this.categoryService.getCategories().then(()=> {
              this.songs = this.songs.filter(song => song.categories.some(category => category.name ===this.authorID))
            })
          }
        } else {
          this.songs = this.songsTemp;
        }
      });

    });

    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");

  }

  ngOnInit(): void {
    // const user:UserModel = JSON.parse(sessionStorage.getItem('user') || '');
    this.botCommand = localStorage.getItem('botCommand') || '';
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

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
      data: this.categoryService.dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
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

  async initializeArtistsAsync() {
    await this.authorService.getAuthors();
    this.artists = this.sharedService.sharedArtistsArray;
  }

}
