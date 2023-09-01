import {Component, Inject} from '@angular/core';
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-author-dialog',
  templateUrl: './delete-author-dialog.component.html',
  styleUrls: ['./delete-author-dialog.component.scss']
})
export class DeleteAuthorDialogComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {name:string,id:string},
              private dialogRef: DialogRef,
              private sb: MatSnackBar) {
  }

  private apiUrl = 'http://localhost:4100/api/authors/'+this.data.id+'/delete';

  deleteAuthor(){
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
     axios.delete(this.apiUrl, {headers}).then(()=> {
       this.sb.open('Artist has been succesfully removed.','', {
           duration: 3000,
           panelClass: ['success-snackBar']
         }
       );
     }).catch((e)=> {
       handleError(e);

     });
    let handleError = (error: any): void => {
      const errorMessage = error.response.data.message;
      console.log(error.response.data.message);
      this.sb.open(errorMessage ,'',{
        duration: 3000,
        panelClass: ['failed-snackBar']
      })
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
