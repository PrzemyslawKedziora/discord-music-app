import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent {


  private apiUrl = 'http://localhost:4100/api/songs/add';
  constructor(public dialogRef: MatDialogRef<NewSongComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: CategoryModel[]) {

  }
  newSongForm = this.fb.group({
    ytURL: ['',Validators.required],
    author: ['',Validators.required],
    categories: [[],Validators.required],
    authorID: '64bdc37f3f27bb6025aaa4ed', //temp
    createdAt: (new Date).toISOString(), //temp
    updatedAt: (new Date).toISOString() //temp

  });
  getCategoryNameById(categoryId: string): string {
    const category = this.data.find(cat => cat._id === categoryId);
    return category ? category.name : '';
  }
  closeDialog(){
    this.dialogRef.close();
  }
  addSong(){
    axios.post('http://localhost:4100/api/users/login',{email:'Wiktorek@gmail.com',password: 'Wiktorek'})
      .then((res) => {
        const accessToken = res.data.accessToken;
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        axios.post(this.apiUrl,this.newSongForm.value,{headers})
          .then((res) => {
        console.log(res);
      });
      console.log('zalogowano ',res)
      })

    console.log(this.newSongForm.value);
  }
}
