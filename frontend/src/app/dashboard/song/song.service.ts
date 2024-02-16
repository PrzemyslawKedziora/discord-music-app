import { Injectable } from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {SongModel} from "../../models/song.model";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EditSongComponent} from "./edit-song/edit-song.component";
import {ApiResponse} from "../../models/api.response";
import {ConfirmDialogComponent} from "./delete-confirm-dialog/confirm-dialog.component";
import {AddSongToPlaylistComponent} from "../playlists/add-song-to-playlist/add-song-to-playlist.component";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  categories: CategoryModel[]=[];
  songs: SongModel[]=[];

  doubleClickTimeout: any;
  userID = sessionStorage.getItem('id')
  accessToken = sessionStorage.getItem('token');
  headers = {
    Authorization: 'Bearer ' + this.accessToken,
  };
  constructor(public dialog: MatDialog,
              public sharedService: SharedService,
              private sb: MatSnackBar,
              private http: HttpClient) {
  }


  getSongs(): Observable<ApiResponse<SongModel[]>> {
    return this.http.get<ApiResponse<SongModel[]>>('https://discord-music-app-backend.vercel.app/api/songs/all');
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
  editSong(song: SongModel): Observable<ApiResponse<SongModel>>{
    const url ='https://discord-music-app-backend.vercel.app/api/songs/edit/'+song._id;
    return this.http.post<ApiResponse<SongModel>>(url,{
      authors: song.authors,
      categories: song.categories
    }, {headers: this.headers});
  }

  like(song: SongModel) {
      const url ='https://discord-music-app-backend.vercel.app/api/songs/'+song._id+'/like';
    this.http.post(url,song._id,{headers: this.headers}).subscribe(()=> {
        if (song.likes.includes(this.userID)){
          song.likes = song.likes.filter(id => id !== this.userID);
          return false;
        }
        else {
          song.likes.push(this.userID);
          return true;
         }
        }
      );

  }

  openInYT(url:string){
    window.open(url,'_blank');
  }

  checkIsLiked(song:SongModel):boolean{
    return song.likes.includes(this.userID || '');
  }

  calcAuthorsLength(authors: {_id:string,name:string}[]){
    let length = 0;
    for (let author of authors){
      length+= author.name.length;
    }
    return length;
  }

  openConfirmDeleteDialog(songID: string, index: number) {

    this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '50%',
      data: {songs: this.songs, songID: songID, index: index}
    })

  }

  openAddToPlaylistDialog(songID: string) {
    this.dialog.open(AddSongToPlaylistComponent, {
      width: '50%',
      data: {songID: songID}
    })

  }

}
