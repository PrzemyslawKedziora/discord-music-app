import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from "../../../../components/snack-bar/song/snack-bar.component";
import {SharedService} from "../../../../services/shared/shared.service";
import {AddDialogModel} from "../../../../models/add-dialog.model";
import {SongRecord, SongModel} from "../../../../models/song.model";
import {AuthorModel} from "../../../../models/author.model";

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent{


  private apiUrl = 'http://localhost:4100/api/songs/add';

  constructor(public dialogRef: MatDialogRef<NewSongComponent>,
              private fb: FormBuilder,
              private sb: MatSnackBar,
              private sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data: AddDialogModel,

  ) {
    this.songData=this.sharedService.sharedSongsArray;
    this.artists = this.sharedService.sharedArtistsArray;
  }

  newSongForm = this.fb.group({
    ytURL: ['', Validators.required],
    authorID: ['', Validators.required],
    categories: [[], Validators.required],
    userID: sessionStorage.getItem('userID'), //temp
    createdAt: (new Date).toISOString(),
    updatedAt: (new Date).toISOString()

  });
  addSongStatus!: boolean;
  songData!: SongModel[];
  artists!: AuthorModel[];
  getCategoryNameById(categoryId: string): string {
    const category = this.data.category.find(cat => cat._id === categoryId);
    return category ? category.name : 'none';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addSong() {
    let duration:number=3000; //3sec
        const accessToken = sessionStorage.getItem('accessToken');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        axios.post(this.apiUrl, this.newSongForm.value, {headers})
          .then((res) => {
            this.addSongStatus = true;
            this.sharedService.sharedAddingSongStatus = this.addSongStatus;
            this.songData.push(new SongRecord(res.data._id,res.data.authorID,res.data.thumbnail,res.data.categories,
              res.data.likes,res.data.name,res.data.userID,res.data.ytURL))
            this.sb.openFromComponent(SnackBarComponent, {
              duration: duration,
              panelClass: ['success-snackBar']
            });
            console.log('Song has been succesfully added!\n', res);
          }).catch((e) => {
          handleError(e)
        });

     let handleError = (error: any): void => {
      this.addSongStatus = false;
      this.sharedService.sharedAddingSongStatus = this.addSongStatus;
      console.log(error);
       this.sb.openFromComponent(SnackBarComponent, {
         duration: 3000,
         panelClass: ['failed-snackBar']
       })
    }
  }
}
