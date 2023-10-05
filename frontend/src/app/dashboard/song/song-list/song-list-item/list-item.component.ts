import {Component, Input, OnInit} from '@angular/core';
import {SongModel} from "../../../../models/song.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../delete-confirm-dialog/confirm-dialog.component";
import {SongComponent} from "../../component/song.component";
import {SongService} from "../../song.service";
import {SharedService} from "../../../../services/shared/shared.service";
import {AddSongToPlaylistComponent} from "../../../playlists/add-song-to-playlist/add-song-to-playlist.component";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{

@Input() songData!:SongModel[];
@Input() songRecord!:SongModel;
@Input() songIndex!:number;
@Input('botCommand') botCommand!:string;

  constructor(public sc: SongComponent,
              private sb: MatSnackBar,
              private dialog: MatDialog,
              public ss: SongService,
              private sharedService: SharedService) {

  }
  isLiked!: boolean;
  isLoggedIn!:boolean;
  user?: any;

  ngOnInit(): void {
    this.isLoggedIn = this.sharedService.isLoggedInStatus;
    this.isLiked = this.ss.checkIsLiked(this.songRecord)
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername !== null) {
      this.user = storedUsername;
    } else {
      console.log('Brak zapisanego użytkownika w sesji.');
    }
  }


  openConfirmDeleteDialog(songID:string,index: number){

      this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '50%',
        data: {songs: this.songData, songID: songID, index: index}
      })

  }

  wrongUser(){
    this.sb.open('You cannot delete song that was not added by you!','',{
      duration: 2000,
      panelClass: ['failed-snackBar']
    });
  }

  openAddToPlaylistDialog(songID:string){
    this.dialog.open(AddSongToPlaylistComponent,{
      width: '50%',
      data: {songID: songID}
    })

  }

}
