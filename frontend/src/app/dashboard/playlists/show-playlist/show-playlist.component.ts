import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {SongService} from "../../song/song.service";

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['../../song/song-list/song-list-item/list-item.component.scss']
})
export class ShowPlaylistComponent {

  isLiked: boolean=false;
  botCommand!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: PlaylistModel,
              private dialogRef: MatDialogRef<ShowPlaylistComponent>,
              public ss:SongService) {
    this.botCommand = localStorage.getItem('botCommand') || ''
  }

  close() {
    this.dialogRef.close();
  }
  onDeleteFromPlaylist(){}
}
