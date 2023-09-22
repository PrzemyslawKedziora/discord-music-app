import { Injectable } from '@angular/core';
import {PlaylistModel} from "../../models/playlist.model";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor() {
  }

  playlists:PlaylistModel[]=[];

  getPlaylists(): Promise<void>{
   return axios.get('http://localhost:4100/api/playlists/all').then(res=>{
      this.playlists = res.data;
      console.log(res)
    });
  }
}
