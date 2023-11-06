import {Component, HostListener, OnInit} from '@angular/core';
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
import {NewSongComponent} from "../new-song/new-song.component";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss', '../song-card/song-card.component.scss'],
})
export class SongComponent implements OnInit{


  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLoggedIn!: boolean;
  authorID!: string;
  catID!: string;
  author!: AuthorModel;
  botCommand:string='';
  isLiked!:boolean;
  searchQuery!:string;
  firstCheck:boolean=true;
  selectedAuthors:AuthorModel[]=[];
  selectedCategories:CategoryModel[]=[];
  paginatedSongs: SongModel[]=[];
  pageEvent: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };
  pageSlice = this.songs.slice(0,5);
  paginationLength:number = this.songs.length;
  isBigScreen=true;

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService,
              private authorService: AuthorService,
              private route : ActivatedRoute,
              private categoryService: CategoryService) {
    this.sharedService.filterStatus=false;

    songService.getSongs().then(()=> {
      this.songs = this.sharedService.sharedSongsArray;
      this.paginatedSongs = this.songs;
      this.paginationLength = this.songs.length;
    });
    categoryService.getCategories().then(()=> {
      this.categories = this.categoryService.categories;
      this.dialogData.category = this.categoryService.categories;
    });
    authorService.getAuthors().then(()=>{
      this.artists = this.sharedService.sharedArtistsArray;
    });
    this.initializeArtistsAsync().then(() => {
      this.route.params.subscribe(params => {
        const criteria = params['authorName'];
        if (criteria != 'music') {
          if (this.authorService.artists.some(author => author.name === criteria)) {
            this.authorService.getAuthors().then(() => {
              this.paginatedSongs = this.songs.filter(song =>
                song.authors.some(author => author.name === criteria)
              );
              this.paginationLength = this.songs.filter(song => song.authors.some(author => author.name === criteria)).length;
            });
          }
          else{
            this.categoryService.getCategories().then(()=> {
              this.paginatedSongs = this.songs.filter(song => song.categories.some(category => category.name ===criteria));
              this.paginationLength = this.songs.filter(song => song.categories.some(category => category.name ===criteria)).length;
            })
          }
        } else {
          this.paginationLength = this.songs.length;
          this.isBigScreen ?
          this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize) :
            this.paginatedSongs = this.songs;
        }
      });

    });
    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
    this.isBigScreen ? this.paginatedSongs = this.paginatedSongs.slice(0,this.pageEvent.pageSize) :
      this.paginatedSongs = this.songs;
  }

  ngOnInit(): void {
    this.botCommand = localStorage.getItem('botCommand') || '';
    this.checkScreenSize();
  }

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
      data: this.categoryService.dialogData
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log('The dialog was closed', result);
      this.paginationLength = result;
    });


  }

  async initializeArtistsAsync() {
    return this.authorService.getAuthors().then(() => {
      this.artists = this.sharedService.sharedArtistsArray;
    });
  }

  searchSong(){
    this.isBigScreen ?
    this.paginatedSongs = this.songs.filter(song =>
      song.name.toLowerCase().includes(this.searchQuery.toLowerCase())).slice(0,this.pageEvent.pageSize) :
      this.paginatedSongs = this.songs.filter(song =>
        song.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
  }

  filterSongs(filterQuery: string){
    const owned = <HTMLInputElement> document.getElementById('show-owned');
    const liked = <HTMLInputElement> document.getElementById('show-liked');
    const userID = sessionStorage.getItem('id')
    if (filterQuery =='owned' && owned.checked) {
      this.paginatedSongs = this.songs.filter(song => song.userID._id == userID).slice(0,this.pageEvent.pageSize);
      this.paginationLength = this.songs.filter(song => song.userID._id == userID).length;
      this.firstCheck = false;
    }
    else if (filterQuery =='liked' && liked.checked) {
      const filteredSongs = this.songs.filter(song => song.likes.includes(userID));
      this.paginatedSongs = filteredSongs.slice(0,this.pageEvent.pageSize);
      this.paginationLength = filteredSongs.length;
      this.firstCheck = false;
    }
    else if (!this.firstCheck){
      this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
      this.paginationLength = this.songs.length;
    }
    else {
      this.searchSong();
    }
  }

  filterSongsByAuthors() {
    if (this.selectedAuthors.length === 0) {
      this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
    } else {
      this.paginatedSongs = this.songs.filter((song) =>
        this.selectedAuthors.every((author) =>
          song.authors.some((songAuthor) => songAuthor._id === author._id)
        )
      ).slice(0,this.pageEvent.pageSize);
    }
  }

  filterSongsByCategories() {
    if (this.selectedCategories.length === 0) {
      this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
    } else {
      this.paginatedSongs = this.songs.filter((song) =>
        this.selectedCategories.every((category) =>
          song.categories.some((cat) => cat._id === category._id)
        )
      ).slice(0,this.pageEvent.pageSize);
    }
  }

  checkScreenSize(){
    this.isBigScreen = window.innerWidth > 1000;
  }

  OnPageChange(event: PageEvent){
    const pageSize = event.pageSize;
    const pageIndex = event.pageIndex;

    this.pageEvent.pageIndex = pageIndex;
    this.pageEvent.pageSize = pageSize;

    const startIndex = pageIndex * pageSize;
    let endIndex = startIndex + pageSize;

    if (endIndex > this.songs.length) {
      endIndex = this.songs.length;
    }
    this.paginatedSongs = this.songs.slice(startIndex, endIndex);

  }

}
