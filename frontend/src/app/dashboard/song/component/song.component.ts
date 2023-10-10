import {Component, HostListener} from '@angular/core';
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

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss'],
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
  author: AuthorModel | undefined;
  botCommand:string='';
  isLiked!:boolean;
  searchQuery!:string;
  firstCheck:boolean=true;
  selectedAuthors:AuthorModel[]=[];
  selectedCategories:CategoryModel[]=[];

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
      this.route.params.subscribe(params => {
        const criteria = params['authorName'];
        if (criteria != 'music') {
          if (this.authorService.artists.some(author => author.name === criteria)) {
            this.authorService.getAuthors().then(() => {
              this.songsTemp = this.songs.filter(song =>
                song.authors.some(author => author.name === criteria)
              );
            });
          }
          else{
            this.categoryService.getCategories().then(()=> {
              this.songsTemp = this.songs.filter(song => song.categories.some(category => category.name ===criteria))
            })
          }
        } else {
          this.songsTemp = this.songs;
        }
      });

    });

    this.sharedService.isLoggedInStatus = this.isLoggedIn;
    this.isLoggedIn = !!sessionStorage.getItem("token");

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result)
    });

  }

  async initializeArtistsAsync() {
    return this.authorService.getAuthors().then(() => {
      this.artists = this.sharedService.sharedArtistsArray;
    });
  }

  searchSong(){
    this.songsTemp = this.songs.filter(song =>
      song.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  filterSongs(filterQuery: string){
    const owned = <HTMLInputElement> document.getElementById('show-owned');
    const liked = <HTMLInputElement> document.getElementById('show-liked');
    const userID = sessionStorage.getItem('id')
    if (filterQuery =='owned' && owned.checked) {
      this.songsTemp = this.songs.filter(song => song.userID._id == userID);
      this.firstCheck = false;
    }
    else if (filterQuery =='liked' && liked.checked) {
      this.songsTemp = this.songs.filter(song => song.likes.includes(userID));
      this.firstCheck = false;
    }
    else if (!this.firstCheck){
      this.songsTemp = this.songs;
    }
    else this.searchSong();
  }

  filterSongsByAuthors() {
    if (this.selectedAuthors.length === 0) {
      this.songsTemp = this.songs;
    } else {
      this.songsTemp = this.songs.filter((song) =>
        this.selectedAuthors.some((author) =>
          song.authors.some((songAuthor) => songAuthor._id === author._id)
        )
      );
    }
  }

  filterSongsByCategories() {
    if (this.selectedCategories.length === 0) {
      this.songsTemp = this.songs;
    } else {
      this.songsTemp = this.songs.filter((song) =>
        this.selectedCategories.some((category) =>
          song.categories.some((cat) => cat._id === category._id)
        )
      );
    }
  }

  checkScreenSize(){
    this.isBigScreen = window.innerWidth > 1000;
  }

}
