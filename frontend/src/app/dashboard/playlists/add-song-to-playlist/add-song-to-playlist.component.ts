import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {PlaylistService} from "../playlist.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../../services/shared/shared.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html',
  styleUrls: ['./add-song-to-playlist.component.scss']
})
export class AddSongToPlaylistComponent implements OnInit{

  playlists!:PlaylistModel[];
  playlistID:string='';

  constructor( @Inject(MAT_DIALOG_DATA) public data: { songID:string },
               private ps: PlaylistService,
               private sb: MatSnackBar,
               public sharedService: SharedService,
               public dialogRef: MatDialogRef<AddSongToPlaylistComponent>,
               private http: HttpClient) { }

  ngOnInit(): void {
    const user = sessionStorage.getItem('id')
    this.ps.getPlaylists().subscribe(res =>{
      this.playlists = res.filter(playlist => playlist.authorID._id == user);
    })
  }

  addToPlaylist(songID:string){
    songID = this.data.songID;
    const url = 'https://discord-music-app-backend.vercel.app/api/playlists/'+this.playlistID+'/add-song';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.post(url,{songID : songID},{headers}).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err);
      })
    ).subscribe(()=>{
      this.sb.open('Song has been succesfully added to playlist!','',{
        duration: 2000,
        panelClass: ['success-snackBar']
      })
    })
  }

  close(){
    this.dialogRef.close();
  }

}
