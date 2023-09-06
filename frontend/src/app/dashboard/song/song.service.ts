import { Injectable } from '@angular/core';
import axios from "axios";
import {CategoryModel} from "../../models/category.model";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(public dialog: MatDialog,
              public sharedService: SharedService) { }

  categories: CategoryModel[]=[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};

  getSongs(): Promise<void>{
    return axios.get('http://localhost:4100/api/songs/all').then((response) => {
     if (this.songs.length ==0){
       for (let i = 0; i < response.data.length; i++) {
         response.data[i].createdAt = Date.parse(response.data[i].createdAt)
         this.songs.push(response.data[i]);
       }
     }
      this.songsTemp = this.songs;
      this.sharedService.sharedSongsArray = this.songs;

    });

  }


}
