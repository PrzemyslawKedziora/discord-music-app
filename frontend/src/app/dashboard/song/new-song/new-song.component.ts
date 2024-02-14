import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SharedService} from "../../../services/shared/shared.service";
import {AddDialogModel} from "../../../models/add-dialog.model";
import {SongRecord, SongModel} from "../../../models/song.model";
import {AuthorModel} from "../../../models/author.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {CategoryService} from "../../categories/category.service";
import {ApiResponse} from "../../../models/api.response";
import {CategoryModel} from "../../../models/category.model";

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
              private categoryService: CategoryService,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: AddDialogModel,
  ) {
    this.songData=this.sharedService.sharedSongsArray;
    this.artists = this.sharedService.sharedArtistsArray;
    this.categoryService.getCategories().subscribe((res: ApiResponse<CategoryModel[]>)=>{
      this.data.category = res.data;
    });
  }

  getCategoryNameById(categoryId: string): string {
    const category = this.data.category.find(cat => cat._id === categoryId);
    return category ? category.name : 'none';
  }

  closeDialog() {
    this.dialogRef.close(this.sharedService.sharedSongsArray ? this.sharedService.sharedSongsArray.length : 0);
  }

  addSong() {
    let duration:number=3000; //3sec
        const accessToken = sessionStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        this.http.post<ApiResponse<SongModel>>(this.apiUrl, this.newSongForm.value, {headers}).pipe(
          catchError((err)=>{
            return this.sharedService.handleError(err.error);
          })
        )
          .subscribe((res)=>{
            this.addSongStatus = true;
            this.sharedService.sharedAddingSongStatus = this.addSongStatus;
            this.sharedService.sharedSongsArray.push(new SongRecord(
              res.data?._id,
              res.data?.authors,
              res.data?.thumbnail,
              res.data?.categories,
              res.data?.likes,
              res.data?.name,
              res.data?.userID,
              res.data?.ytURL,res.data?.createdAt));
            this.sb.open('Song has been succesfully added!','', {
              duration: duration,
              panelClass: ['success-snackBar']
            });
            this.newSongForm.reset();
          })
  }
}
