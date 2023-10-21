import { Injectable } from '@angular/core';
import {PlaylistModel} from "../../models/playlist.model";
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private sb: MatSnackBar) {
  }

  playlists:PlaylistModel[]=[];

  getPlaylists(): Promise<void>{
   return axios.get('https://discord-music-app-backend.vercel.app/api/playlists/all').then(res=>{
      this.playlists = res.data;
    });
  }

  deletePlaylist(playlist:PlaylistModel,index:number){
   const urlString = 'https://discord-music-app-backend.vercel.app/api/playlists/'+playlist._id+'/delete';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };

   axios.delete(urlString,{headers}).then(()=> {
     this.playlists.splice(index,1);
     this.sb.open('Song has been succesfully removed','',{
       duration:2000,
       panelClass: ['success-snackBar']
     })
   }).catch((e) => {
     this.sb.open(e || 'blad','',{
       duration: 2000,
       panelClass: ['failed-snackBar']
     })
   })
  }

  updatePlaylist(playlist: PlaylistModel){
    const urlString = 'https://discord-music-app-backend.vercel.app/api/playlists/edit/'+playlist._id;
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(urlString,playlist,{headers});
  }
  likePlaylist(playlist: PlaylistModel){
    const url ='https://discord-music-app-backend.vercel.app/api/songs/'+playlist._id+'/like';
    const accessToken = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('id');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(url,playlist._id,{headers}).then(()=> {
        if (playlist.likes.includes(userID)){
          playlist.likes = playlist.likes.filter(id => id !== userID);
          return false;
        }
        else {
          playlist.likes.push(userID);
          return true;
        }
      }
    );
  }

}
