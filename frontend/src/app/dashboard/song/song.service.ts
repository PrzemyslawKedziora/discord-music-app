import { Injectable } from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {SongModel} from "../../models/song.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EditSongComponent} from "./edit-song/edit-song.component";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private sb: MatSnackBar,
              private http: HttpClient) {

  }

  categories: CategoryModel[]=[];
  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  dialogData: AddDialogModel={category:[],author:[]};
  isLiked!:boolean;
  doubleClickTimeout: any;

  getSongs(): Observable<SongModel[]> {
    return this.http.get<SongModel[]>('https://discord-music-app-backend.vercel.app/api/songs/all');
  }

  onClick(event: MouseEvent){
    if (this.doubleClickTimeout == null) {
      this.doubleClickTimeout = setTimeout(() => {
        this.sb.open('Song has been successfully copied to clipboard.','',{
          duration: 2000,
          panelClass: ['success-snackBar']
        });
        clearTimeout(this.doubleClickTimeout);
        this.doubleClickTimeout = null;
      }, 200);
    }
  }
  editSongDialog(song: SongModel) {

    this.dialog.open(EditSongComponent, {
      disableClose: true,
      data: song
    })

  }
  editSong(){

  }

  like(song: SongModel) {
      const url ='https://discord-music-app-backend.vercel.app/api/songs/'+song._id+'/like';
      const accessToken = sessionStorage.getItem('token');
      const userID = sessionStorage.getItem('id');
      const headers = {
      Authorization: 'Bearer ' + accessToken,
     };

    this.http.post(url,song._id,{headers}).subscribe(()=> {
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

  calcAuthorsLength(authors: {_id:string,name:string}[]){
    let length = 0;
    for (let author of authors){
      length+= author.name.length;
    }
    return length;
  }

}
