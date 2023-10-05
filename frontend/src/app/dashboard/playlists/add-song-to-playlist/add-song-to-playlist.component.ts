import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PlaylistModel} from "../../../models/playlist.model";
import {PlaylistService} from "../playlist.service";
import axios from "axios";

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html',
  styleUrls: ['./add-song-to-playlist.component.scss']
})
export class AddSongToPlaylistComponent{

  playlists!:PlaylistModel[];
  playlistID:string='';

  constructor( @Inject(MAT_DIALOG_DATA) public data: { songID:string },
               private ps: PlaylistService) {
    console.log(data)
    const user = sessionStorage.getItem('id')
    ps.getPlaylists().then(()=>{
      this.playlists = ps.playlists.filter(playlist => playlist.authorID._id == user);
    })
  }

  showID(){
    console.log(this.playlistID)
  }

  addToPlaylist(songID:string){
    songID = this.data.songID;
    console.log(songID,'piosenki');
    console.log(this.playlistID,'plejka');
    const url = 'http://localhost:4100/api/playlists/'+this.playlistID+'/add-song';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(url,{songID : songID},{headers}).then((res)=> {
      console.log(res)
    }).catch(e =>{
      console.log(e.response.data.message);
    })
  }

}
