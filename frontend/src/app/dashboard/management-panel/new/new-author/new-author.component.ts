import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedService} from "../../../../services/shared/shared.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthorModel} from "../../../../models/author.model";
import axios from "axios";
import {SnackBarComponent} from "../../../../components/snack-bar/song/snack-bar.component";
import {AuthorSnackBarComponent} from "../../../../components/snack-bar/author/author-snack-bar.component";

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.scss']
})
export class NewAuthorComponent {

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
    userID: '64bdc37f3f27bb6025aaa4ed'
  });

  addAuthorStatus!: boolean;

  addAuthor(){
    let duration:number=3000; //3sec
    axios.post('http://localhost:4100/api/users/login', {email: 'Wiktorek@gmail.com', password: 'Wiktorek'})
      .then((res) => {
        const accessToken = res.data.accessToken;
        const headers = {
          Authorization: 'Bearer ' + accessToken,
        };
        axios.post(this.apiUrl, this.authorForm.value, {headers})
          .then((res) => {
            this.addAuthorStatus = true;
            this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
            this.sb.openFromComponent(AuthorSnackBarComponent, {
              duration: duration,
              panelClass: ['success-snackBar']
            });
            // setTimeout(()=>{
            //   location.reload()
            // },duration)
            console.log('Author has been succesfully added!\n', res);
          }).catch((e) => {
          handleError(e)
        });
      }).catch((e) => {
      handleError(e)
    })

    let handleError = (error: any): void => {
      this.addAuthorStatus = false;
      this.sharedService.sharedAddingAuthorStatus = this.addAuthorStatus;
      console.log(error);
      this.sb.openFromComponent(SnackBarComponent, {
        duration: 3000,
        panelClass: ['failed-snackBar']
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
