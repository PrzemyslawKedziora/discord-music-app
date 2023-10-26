import {Component,OnInit} from '@angular/core';
import {SongService} from "../song/song.service";
import {SongModel} from "../../models/song.model";
import {SharedService} from "../../services/shared/shared.service";
import {UserService} from "../../services/user/user.service";
import {NewSongComponent} from "../song/new-song/new-song.component";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../categories/category.service";
import {AddPlaylistDialogComponent} from "../playlists/add-playlist-dialog/add-playlist-dialog.component";
import {PlaylistModel} from "../../models/playlist.model";
import {AuthorService} from "../authors/author.service";
import {AddDialogModel} from "../../models/add-dialog.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  songsSortedByDate: SongModel[]=[];
  isLoggedIn!:boolean;
  dialogContent!:PlaylistModel[];
  dialogData: AddDialogModel={category:[],author:[]};

  constructor(public ss: SongService,
              public sharedService : SharedService,
              public userService: UserService,
              private dialog: MatDialog,
              private cs: CategoryService,
              private as: AuthorService) {
    sessionStorage.getItem('username') ? this.isLoggedIn = true : this.isLoggedIn = false;

      ss.getSongs().then(()=> {
        this.songs = ss.songs;
        this.songsSortedByDate = ss.songs
          .sort((song1,song2)=> Number.parseFloat(song2.createdAt.toString()) - Number.parseFloat(song1.createdAt.toString()))
          .slice(0,6);
        this.songs = this.songs.sort((song1,song2)=> song2.likes.length - song1.likes.length).slice(0,6);
      });
      as.getAuthors().then(()=> {
        this.dialogData.author = as.artists;
      });
      cs.getCategories().then(()=> {
        this.dialogData.category = cs.categories;

      })
  }

  ngOnInit(): void {
    sessionStorage.getItem('token') ?
      this.sharedService.isLoggedInStatus = true : this.sharedService.isLoggedInStatus=false;

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

  openAddPlaylistDialog(){
    this.dialog.open(AddPlaylistDialogComponent,{
      disableClose:true,
      width:'70vw',
      data: this.dialogContent
    })
  }


}
