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
   return axios.get('http://localhost:4100/api/playlists/all').then(res=>{
      this.playlists = res.data;
      console.log(res)
    });
  }

  deletePlaylist(playlist:PlaylistModel,index:number){
   const urlString = 'http://localhost:4100/api/playlists/'+playlist._id+'/delete';
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
    const urlString = 'http://localhost:4100/api/playlists/edit/'+playlist._id;
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(urlString,playlist,{headers});
  }

}
