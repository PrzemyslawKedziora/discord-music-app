import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../services/shared/shared.service";
import {SongModel} from "../../../models/song.model";
import {AuthorModel} from "../../../models/author.model";
import {CategoryModel} from "../../../models/category.model";
import {SongService} from "../song.service";
import {catchError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['../new-song/new-song.component.scss', './edit-song.component.scss']
})
export class EditSongComponent implements OnInit{

  artists!: AuthorModel[];
  categories!: CategoryModel[];
  editSongForm!: FormGroup;
  constructor(
              @Inject(MAT_DIALOG_DATA) public data: SongModel,
              public dialogRef: MatDialogRef<EditSongComponent>,
              public songService: SongService,
              private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar
  ) {
    this.artists = this.sharedService.sharedArtistsArray;
    this.categories = this.sharedService.sharedCategoriesArray;
  }

  ngOnInit(): void {
    this.editSongForm = this.fb.group({
      _id: this.data._id,
      authors: [this.data.authors, Validators.required],
      categories: [this.data.categories, Validators.required],
      updatedAt: (new Date).toISOString()

    });
  }

  editSongFun(){
    this.songService.editSong(this.editSongForm.value).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err);
      })
    ).subscribe(res=>{
        this.sb.open('Song data has been succesfully changed!','',{
          duration: 3000,
          panelClass: ['success-snackBar']
        })
      this.closeDialog();
    }
    )
  }
  compareByID(ob1: any, ob2: any): boolean {
      return ob1 && ob2 ? ob1._id === ob2._id : ob1 === ob2;
  }
  closeDialog(){
    this.dialogRef.close()
  }

}
