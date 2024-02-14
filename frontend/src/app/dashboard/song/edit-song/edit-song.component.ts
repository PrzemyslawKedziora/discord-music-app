import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../services/shared/shared.service";
import {CategoryService} from "../../categories/category.service";
import {SongModel} from "../../../models/song.model";
import {AuthorModel} from "../../../models/author.model";
import {CategoryModel} from "../../../models/category.model";
import {ApiResponse} from "../../../models/api.response";
import {SongService} from "../song.service";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['../new-song/new-song.component.scss']
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
              private categoryService: CategoryService,
  ) {
    this.artists = this.sharedService.sharedArtistsArray;
    this.categoryService.getCategories().subscribe((res: ApiResponse<CategoryModel[]>)=>{
      this.categories = res.data;
    });
  }

  ngOnInit(): void {
    this.editSongForm = this.fb.group({
      ytURL: [this.data.ytURL, Validators.required],
      authors: [this.data.authors, Validators.required],
      categories: [this.data.categories, Validators.required],
      userID: sessionStorage.getItem('userID'), //temp
      updatedAt: (new Date).toISOString()

    });
  }


  compareByID(ob1: any, ob2: any): boolean {
      return ob1 && ob2 ? ob1._id === ob2._id : ob1 === ob2;
  }
  closeDialog(){
    this.dialogRef.close()
  }

}
