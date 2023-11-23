import {Component,OnInit} from '@angular/core';
import {SongService} from "../song/song.service";
import {SongModel} from "../../models/song.model";
import {AuthorModel} from "../../models/author.model";
import {SharedService} from "../../services/shared/shared.service";
import {UserService} from "../../services/user/user.service";
import {NewSongComponent} from "../song/new-song/new-song.component";
import {MatDialog} from "@angular/material/dialog";
import {CategoryService} from "../categories/category.service";
import {AddPlaylistDialogComponent} from "../playlists/add-playlist-dialog/add-playlist-dialog.component";
import {PlaylistModel} from "../../models/playlist.model";
import {AuthorService} from "../authors/author.service";
import {AddDialogModel} from "../../models/add-dialog.model";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: SongModel[]=[];
  authors: AuthorModel[]=[];
  songsTemp: SongModel[]=[];
  songsSortedByDate: SongModel[]=[];
  isLoggedIn!:boolean;
  dialogContent!:PlaylistModel[];
  dialogData: AddDialogModel={category:[],author:this.authors};

  constructor(public ss: SongService,
              public sharedService : SharedService,
              public userService: UserService,
              private dialog: MatDialog,
              private cs: CategoryService,
              private as: AuthorService) {
    sessionStorage.getItem('username') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.ss.getSongs().subscribe((res:SongModel[])=>{
      this.songs = res;
      this.songsSortedByDate = res
        .sort((song1,song2)=> Number.parseFloat(song2.createdAt.toString()) - Number.parseFloat(song1.createdAt.toString()))
        .slice(0,6);
      this.songs = this.songs.sort((song1,song2)=> song2.likes.length - song1.likes.length).slice(0,6);
    })
    this.as.getAuthors().subscribe((res: AuthorModel[]) => {
      res = res.sort((art1,art2)=> art1.name.localeCompare(art2.name));
      this.sharedService.sharedArtistsArray = res;
      this.dialogData.author = res;
    });
    this.cs.getCategories().subscribe((res: CategoryModel[]) =>{
      res = res.sort((cat1,cat2)=> cat1.name.localeCompare(cat2.name))
      this.dialogData.category = res;
    })
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
