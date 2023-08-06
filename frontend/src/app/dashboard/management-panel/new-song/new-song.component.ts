import { Component } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent {

  private apiUrl = 'http://localhost:4100/api/songs'; //inny raczej trzeba
  constructor(public dialogRef: MatDialogRef<NewSongComponent>,
              private fb: FormBuilder) {
  }
  lists:string[]=['trap','rap','hip=hop']
  newSongForm = this.fb.group({
    url: ['',Validators.required],
    category: ['',Validators.required]
  });


  closeDialog(){
    this.dialogRef.close();
  }
  addSong(){
    axios.post(`${this.apiUrl}`,this.newSongForm.get('url')?.value);
    console.log(this.newSongForm.get('url')?.value);
  }
}
