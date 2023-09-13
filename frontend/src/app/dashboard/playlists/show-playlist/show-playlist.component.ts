import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";

@Component({
  selector: 'app-show-playlist',
  templateUrl: './show-playlist.component.html',
  styleUrls: ['./show-playlist.component.scss']
})
export class ShowPlaylistComponent {

  urlString='http://localhost:4100/api/playlists/'+this.data._id

  constructor(@Inject(MAT_DIALOG_DATA) public data: PlaylistModel,
              private dialogRef: MatDialogRef<ShowPlaylistComponent>) {
  }

  close(){
    this.dialogRef.close();
  }

}
