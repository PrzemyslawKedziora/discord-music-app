import {AfterContentChecked, Component, HostListener, OnInit} from '@angular/core';
import {CategoryModel} from "../../../models/category.model";
import {AuthorModel} from "../../../models/author.model";
import {SongModel} from "../../../models/song.model";
import {AddDialogModel} from "../../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../../services/shared/shared.service";
import {SongService} from "../song.service";
import {AuthorService} from "../../authors/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../categories/category.service";
import {NewSongComponent} from "../new-song/new-song.component";
import {PageEvent} from "@angular/material/paginator";
import {ApiResponse} from "../../../models/api.response";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss', '../song-card/song-card.component.scss'],
})
export class SongComponent implements OnInit,AfterContentChecked{

  loaded = this.sharedService.isLoaded;
  categories!: CategoryModel[];
  artists!: AuthorModel[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
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
  hasParams:boolean=false;
  copyMode:string = localStorage.getItem('copyMode') ?? '';

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private songService: SongService,
              private authorService: AuthorService,
              private route : ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {
    this.sharedService.sharedArtistsArray;
    this.sharedService.sharedCategoriesArray;
    this.sharedService.filterStatus=false;
    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
    this.isBigScreen ? this.paginatedSongs = this.paginatedSongs.slice(0,this.pageEvent.pageSize) :
      this.paginatedSongs = this.songs;
  }

  ngOnInit(): void {
     this.songService.getSongs().subscribe((res: ApiResponse<SongModel[]>)=>{
       this.sharedService.sharedSongsArray = res.data;
       this.songs = res.data;
       this.songsTemp = this.sharedService.sharedSongsArray;
       this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
       this.paginationLength = this.songs.length;

     })
     this.sharedService.isLoaded = true;

    this.sortRecordsBy('categories');
    this.sortRecordsBy('authors');

    this.route.params.subscribe(params => {
      const criteria = params['authorName'];
      if (criteria != 'music') {
        this.hasParams = true;
        const artistsLS = sessionStorage.getItem('artists') || '';
        if (artistsLS.includes(criteria)) {
          this.authorService.getAuthors().subscribe(()=>{
            this.songs = this.songs.filter(song =>
              song.authors && song.authors.some(author => author.name.toLowerCase() === criteria.toLowerCase())
            );
            this.paginatedSongs = this.songs;
            this.paginationLength = this.songs.length;
          });
        }
        else{
          this.categoryService.getCategories().subscribe(()=>{
            this.songs = this.songs.filter(song => song.categories.some(category => category.name ===criteria));
            this.paginatedSongs = this.songs;
            this.paginationLength = this.songs.length;
          })
        }
      } else {
        this.paginationLength = this.songs.length;
        this.isBigScreen ?
          this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize) :
          this.paginatedSongs = this.songs;
      }
    });

    this.botCommand = localStorage.getItem('botCommand') || '';
    this.checkScreenSize();
  }

  private sortRecordsBy(criteria: string) {
    if (criteria === 'categories'){
      this.categoryService.getCategories().subscribe((res: ApiResponse<CategoryModel[]>) => {
        this.categories = res.data.sort((a1, a2) => a1.name.localeCompare(a2.name));
        this.sharedService.sharedCategoriesArray = this.categories;
        this.dialogData.category = res.data;
      });
    }
    else if (criteria === 'authors'){
      this.authorService.getAuthors().subscribe((res: ApiResponse<AuthorModel[]>) =>{
        this.artists = res.data.sort((a1,a2)=>a1.name.localeCompare(a2.name));
        this.sharedService.sharedArtistsArray = this.artists;
        sessionStorage.setItem('artists',this.artists.map(artist => artist.name).toString());
        this.dialogData.author = res.data;
      });
    }
  }

  ngAfterContentChecked(): void {
    this.pageEvent.pageSize = 5;
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

  searchSong(){
    this.isBigScreen ?
    this.paginatedSongs = this.songs.filter(song =>
      song.name.toLowerCase().includes(this.searchQuery.toLowerCase())).slice(0,this.pageEvent.pageSize) :
      this.paginatedSongs = this.songs.filter(song =>
        song.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  filterSongs(filterQuery: string){
    const owned = <HTMLInputElement> document.getElementById('show-owned');
    const liked = <HTMLInputElement> document.getElementById('show-liked');
    const userID = sessionStorage.getItem('id')
    if (filterQuery =='owned' && owned.checked) {
      this.songs = this.songs.filter(song => song.userID._id == userID);
      this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
      this.paginationLength = this.songs.length;
      this.firstCheck = false;
    }
    else if (filterQuery =='liked' && liked.checked) {
      this.songs = this.songs.filter(song => song.likes.includes(userID));
      this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
      this.paginationLength = this.songs.length;
      this.firstCheck = false;
    }
    else if (!this.firstCheck){
      this.songs = this.songsTemp;
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

  clearFilters(){
    this.selectedAuthors = [];
    this.selectedCategories = [];
    this.songs = this.songsTemp;
    this.paginatedSongs = this.songs.slice(0,this.pageEvent.pageSize);
    this.hasParams = false;
    this.searchQuery = '';
    this.router.navigate(['dashboard/music/']);
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
