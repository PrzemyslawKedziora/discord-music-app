import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlaylistModel, PlaylistRecord} from "../../../models/playlist.model";
import {PlaylistService} from "../playlist.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-add-playlist-dialog',
  templateUrl: './add-playlist-dialog.component.html',
  styleUrls: ['./add-playlist-dialog.component.scss']
})
export class AddPlaylistDialogComponent {

  playlistForm = this.fb.group({
    _id: '',
    name: ['',Validators.required],
    songs: [[]],
    pictureURL: [''],
  });
  playlists:PlaylistModel[]=[];
  constructor(private dialogRef: MatDialogRef<AddPlaylistDialogComponent>,
              private fb: FormBuilder,
              private sb: MatSnackBar,
              private ps: PlaylistService,
              private ss: SharedService,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: PlaylistModel) {
  }

  createPlaylist(){
    const apiURL = 'https://discord-music-app-backend.vercel.app/api/playlists/add';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    const newPlaylist: PlaylistRecord = {
      _id: '',
      name: this.playlistForm.value.name || '',
      songs: [],
      pictureURL: this.playlistForm.value.pictureURL || '',
      authorID: {_id: '',username: ''} ,
      likes: []
    };


    this.http.post(apiURL, newPlaylist, { headers }).pipe(
      catchError((err)=>{
        return this.ss.handleError(err);
      })
    )
      .subscribe((res)=>{
        try {
          newPlaylist._id = res._id;
          this.ss.sharedPlaylistArray.push(newPlaylist);
          this.sb.open('Playlist has been successfully added!', '', {
            duration: 3000,
            panelClass: ['success-snackBar']
          });
        } catch (e: any) {
          const errorMessage = e.response.data.message || 'The URL has wrong format';
          console.log(errorMessage);
          this.sb.open(errorMessage, '', {
            duration: 3000,
            panelClass: ['failed-snackBar']
          });
        }
      })
  }

  close(){
    this.dialogRef.close();
  }

}
