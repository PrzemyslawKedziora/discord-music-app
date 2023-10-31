import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SharedService} from "../../../services/shared/shared.service";
import {AddDialogModel} from "../../../models/add-dialog.model";
import {SongRecord, SongModel} from "../../../models/song.model";
import {AuthorModel} from "../../../models/author.model";

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent{

  private apiUrl = 'https://discord-music-app-backend.vercel.app/api/songs/add';
  addSongStatus!: boolean;
  songData!: SongModel[];
  artists!: AuthorModel[];
  newSongForm = this.fb.group({
    ytURL: ['', Validators.required],
    authors: [[], Validators.required],
    categories: [[], Validators.required],
    userID: sessionStorage.getItem('userID'), //temp
    createdAt: (new Date).toISOString(),
    updatedAt: (new Date).toISOString()

  });
  constructor(public dialogRef: MatDialogRef<NewSongComponent>,
              private fb: FormBuilder,
              private sb: MatSnackBar,
              private sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data: AddDialogModel,

  ) {
    this.songData=this.sharedService.sharedSongsArray;
    this.artists = this.sharedService.sharedArtistsArray;
  }

  getCategoryNameById(categoryId: string): string {
    const category = this.data.category.find(cat => cat._id === categoryId);
    return category ? category.name : 'none';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addSong() {
    let duration:number=3000; //3sec
        const accessToken = sessionStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        axios.post(this.apiUrl, this.newSongForm.value, {headers})
          .then((res) => {
            this.addSongStatus = true;
            this.sharedService.sharedAddingSongStatus = this.addSongStatus;
            this.sharedService.sharedSongsArray.push(new SongRecord(res.data._id,res.data.authors,res.data.thumbnail,res.data.categories,
              res.data.likes,res.data.name,res.data.userID,res.data.ytURL,res.data.createdAt))
            this.sb.open('Song has been succesfully added!','', {
              duration: duration,
              panelClass: ['success-snackBar']
            });
            this.newSongForm.reset();
          }).catch((e) => {
          handleError(e)
        });
     let handleError = (error: any): void => {
      this.addSongStatus = false;
      this.sharedService.sharedAddingSongStatus = this.addSongStatus;
      const errorMessage = error.response.data.message;
      console.log(error.response.data.message);
       this.sb.open(errorMessage || 'The URL has wrong format' ,'',{
         duration: 3000,
         panelClass: ['failed-snackBar']
       })
    }
  }
}
