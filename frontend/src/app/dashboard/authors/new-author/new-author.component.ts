import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../../services/shared/shared.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {AuthorModel, AuthorRecord} from "../../../models/author.model";

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent{

  private apiUrl = 'http://localhost:4100/api/authors/add';

  constructor(public dialogRef: MatDialogRef<NewAuthorComponent>,
              private fb: FormBuilder,
              private sb: MatSnackBar,
              private sharedService: SharedService,
              @Inject(MAT_DIALOG_DATA) public data: AuthorModel) {
  }


  authorForm = this.fb.group({
    name: ['', Validators.required],
    pictureURL: '',
    userID: sessionStorage.getItem('id')
  });

  addAuthorStatus!: boolean;
  authors: AuthorModel[] =[];

  addAuthor(){
    let duration:number=3000; //3sec
        const accessToken = sessionStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        console.log(this.authorForm.value);
      try {
        axios.post(this.apiUrl, this.authorForm.value, {headers})
          .then((res) => {
            const newAuthor = new AuthorRecord(res.data._id,res.data.name, res.data.pictureURL, res.data.userID);
            console.log(newAuthor)
            this.authors.push(newAuthor);
            this.sharedService.addNewAuthor(newAuthor);
            this.sb.open('Author has been successfully added!', '', {
              duration: duration,
              panelClass: ['success-snackBar']
            });
            this.addAuthorStatus = true;
            this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;

            console.log('Author has been succesfully added!\n', res);
          }).catch((e) => {
          handleError(e)
        });


        let handleError = (error: any): void => {
          this.addAuthorStatus = false;
          this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
          console.log(error);
          this.sb.open(error.response.data.message, '', {
            duration: 3000,
            panelClass: ['failed-snackBar']
          })
        }
      }
  catch (error){
    this.addAuthorStatus = false;
    this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
    console.log(error);
    this.sb.open('An error has occured.Please check console.', '', {
      duration: 3000,
      panelClass: ['failed-snackBar']
    })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
