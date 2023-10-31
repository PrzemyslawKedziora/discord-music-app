import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {SongService} from "../../song/song.service";
import {UserModel} from "../../../models/user.model";
import {PlaylistService} from "../playlist.service";
import {SongModel} from "../../../models/song.model";
import axios from "axios";
import {SharedService} from "../../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['../../song/song-list/song-list-item/list-item.component.scss', '../../song/song-card/song-card.component.scss']
})
export class ShowPlaylistComponent{

  isLiked!: boolean;
  botCommand!:string;
  isYourPlaylist:boolean=false;
  isPlaylistChanged:boolean=false;
  userID = sessionStorage.getItem('id');

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dialog: PlaylistModel,index:number,song:SongModel},
              private dialogRef: MatDialogRef<ShowPlaylistComponent>,
              public ss:SongService,
              public ps: PlaylistService,
              public sharedService: SharedService,
              private sb: MatSnackBar) {
    let loggedUser!:UserModel;
    this.botCommand = localStorage.getItem('botCommand') || '';
    if (sessionStorage.getItem('user')){
      loggedUser = JSON.parse(sessionStorage.getItem('user') || '');
      this.data.dialog.authorID._id == loggedUser._id ? this.isYourPlaylist = true : this.isYourPlaylist = false;
    }
  }

  close() {
    this.dialogRef.close();
    if (this.isYourPlaylist && this.isPlaylistChanged){
      this.ps.updatePlaylist(this.data.dialog);
    }
  }

  onDeleteFromPlaylist(playlist:PlaylistModel,index: number,song:SongModel){
    const url = 'https://discord-music-app-backend.vercel.app/api/playlists/'+playlist._id
    +'/remove-song';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(url,{songID: song._id},{headers}).then(()=>{
      this.data.dialog.songs.splice(index,1);
      this.isPlaylistChanged = true;
      this.sb.open('Song has been successfully removed from playlist!','',{
        duration: 2000,
        panelClass: ['success-snackBar']
      })
    })
  }

  onPlaylistDelete(playlist: PlaylistModel,index:number){
    this.ps.deletePlaylist(playlist,index)
  }

}
