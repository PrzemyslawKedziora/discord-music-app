import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {SongService} from "../../song/song.service";
import {UserModel} from "../../../models/user.model";
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['../../song/song-list/song-list-item/list-item.component.scss']
})
export class ShowPlaylistComponent{

  isLiked: boolean=false;
  botCommand!:string;
  isYourPlaylist!:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {dialog: PlaylistModel,index:number},
              private dialogRef: MatDialogRef<ShowPlaylistComponent>,
              public ss:SongService,
              public ps: PlaylistService) {
    this.botCommand = localStorage.getItem('botCommand') || '';
    const loggedUser:UserModel = JSON.parse(sessionStorage.getItem('user') || '')
    this.data.dialog.authorID._id == loggedUser._id ? this.isYourPlaylist = true : this.isYourPlaylist = false;
  }

  close() {
    this.dialogRef.close();
  }

  onDeleteFromPlaylist(){}
}
