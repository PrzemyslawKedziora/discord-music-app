import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../../services/shared/shared.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorModel, AuthorRecord} from "../../../models/author.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent{

  private apiUrl = 'https://discord-music-app-backend.vercel.app/api/authors/add';
  addAuthorStatus!: boolean;
  authors: AuthorModel[] = this.sharedService.sharedArtistsArray;
  authorForm = this.fb.group({
    name: ['', Validators.required],
    pictureURL: '',
    userID: sessionStorage.getItem('id')
  });

  constructor(public dialogRef: MatDialogRef<NewAuthorComponent>,
              private fb: FormBuilder,
              private sb: MatSnackBar,
              private sharedService: SharedService,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: AuthorModel) {
  }

  addAuthor(){
    let duration:number=3000; //3sec
        const accessToken = sessionStorage.getItem('token');
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
      try {
        this.http.post(this.apiUrl,this.authorForm.value,{headers}).pipe(
          catchError((err)=>{
            return this.sharedService.handleError(err);
          })
        ).subscribe((res: any)=>{
          const newAuthor = new AuthorRecord(res._id,res.name, res.pictureURL, res.userID);
          this.authors.push(newAuthor);
          this.sharedService.addNewAuthor(newAuthor);
          this.sb.open('Author has been successfully added!', '', {
            duration: duration,
            panelClass: ['success-snackBar']
          });
          this.addAuthorStatus = true;
          this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
        })
      }
  catch (error){
    this.addAuthorStatus = false;
    this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
    console.error(error);
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
