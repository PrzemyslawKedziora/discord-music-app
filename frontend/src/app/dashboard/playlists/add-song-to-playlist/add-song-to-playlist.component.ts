import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {PlaylistService} from "../playlist.service";
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html',
  styleUrls: ['./add-song-to-playlist.component.scss']
})
export class AddSongToPlaylistComponent{

  playlists!:PlaylistModel[];
  playlistID:string='';

  constructor( @Inject(MAT_DIALOG_DATA) public data: { songID:string },
               private ps: PlaylistService,
               private sb: MatSnackBar,
               public sharedService: SharedService,
               public dialogRef: MatDialogRef<AddSongToPlaylistComponent>) {
    const user = sessionStorage.getItem('id')
    ps.getPlaylists().then(()=>{
      this.playlists = ps.playlists.filter(playlist => playlist.authorID._id == user);
    })
  }
  addToPlaylist(songID:string){
    songID = this.data.songID;
    const url = 'https://discord-music-app-backend.vercel.app/api/playlists/'+this.playlistID+'/add-song';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(url,{songID : songID},{headers}).then((res)=> {
      this.sb.open('Song has been succesfully added to playlist!','',{
        duration: 2000,
        panelClass: ['success-snackBar']
      })
    }).catch(e =>{
      this.sb.open(e.response.data.message,'',{
        duration: 2000,
        panelClass: ['failed-snackBar']
      })
      console.log(e.response.data.message);
    })
  }

  close(){
    this.dialogRef.close();
  }

}
