import { Injectable } from '@angular/core';
import {PlaylistModel} from "../../models/playlist.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {SharedService} from "../../services/shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private sb: MatSnackBar,
              private sharedService: SharedService,
              private http: HttpClient) {
  }

  playlists:PlaylistModel[]=[];

  getPlaylists(): Observable<PlaylistModel[]>{
    return this.http.get<PlaylistModel[]>('https://discord-music-app-backend.vercel.app/api/playlists/all');
  }

  deletePlaylist(playlist:PlaylistModel,index:number){
   const urlString = 'https://discord-music-app-backend.vercel.app/api/playlists/'+playlist._id+'/delete';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.delete(urlString,{headers}).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err);
      })
    ).subscribe(()=>{
      this.sharedService.sharedPlaylistArray.splice(index,1);
      this.sharedService.sharedPlaylistArray = this.playlists.splice(index,1);
      this.sb.open('Playlist has been succesfully removed','',{
        duration:2000,
        panelClass: ['success-snackBar']
      });
    })
  }

  updatePlaylist(playlist: PlaylistModel){
    const urlString = 'https://discord-music-app-backend.vercel.app/api/playlists/edit/'+playlist._id;
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.post(urlString,playlist,{headers});
  }
  likePlaylist(playlist: PlaylistModel){
    const url ='https://discord-music-app-backend.vercel.app/api/songs/'+playlist._id+'/like';
    const accessToken = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('id');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };

    this.http.post(url,playlist._id,{headers}).subscribe(res=>{
      if (playlist.likes.includes(userID)){
        playlist.likes = playlist.likes.filter(id => id !== userID);
        return false;
      }
      else {
        playlist.likes.push(userID);
        return true;
      }
    })
  }

}
