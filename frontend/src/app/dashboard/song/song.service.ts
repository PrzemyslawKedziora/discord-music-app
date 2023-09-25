import { Injectable } from '@angular/core';
import axios from "axios";
import {CategoryModel} from "../../models/category.model";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private sb: MatSnackBar,) {}

  categories: CategoryModel[]=[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLiked!:boolean;

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
  onClick(){
    this.sb.open('Song has been successfully copied to clipboard.','',{
      duration: 2000,
      panelClass: ['success-snackBar']
    });
  }

  like(song: SongModel) {
      const url ='http://localhost:4100/api/songs/'+song._id+'/like';
      const accessToken = sessionStorage.getItem('token');
      const userID = sessionStorage.getItem('id');
      const headers = {
      Authorization: 'Bearer ' + accessToken,
     };
      axios.post(url,song._id,{headers}).then(()=> {
        if (song.likes.includes(userID)){
          song.likes = song.likes.filter(id => id !== userID);
          return false;
        }
        else {
          song.likes.push(userID);
          return true;
         }
        }
      );

  }

  openInYT(url:string){
    window.open(url,'_blank');
  }

  checkIsLiked(song:SongModel):boolean{
    const userID = sessionStorage.getItem('id');
    return song.likes.includes(userID || '');
  }

}
