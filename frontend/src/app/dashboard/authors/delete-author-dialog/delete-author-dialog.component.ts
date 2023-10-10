import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorModel} from "../../../models/author.model";

@Component({
  selector: 'app-delete-author-dialog',
  templateUrl: './delete-author-dialog.component.html',
  styleUrls: ['./delete-author-dialog.component.scss']
})
export class DeleteAuthorDialogComponent {


  constructor(private dialogRef: MatDialogRef<DeleteAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {author: AuthorModel, authors:AuthorModel[],index:number},
              private sb: MatSnackBar) {
    this.titleString = 'Do not you really need '+this.data.author.name+' in your team?';
  }

  private apiUrl = 'https://discord-music-app-backend.vercel.app/api/authors/'+this.data.author._id+'/delete';
  titleString!:string;

  deleteAuthor(){
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.data.authors.splice(this.data.index,1);
     axios.delete(this.apiUrl, {headers}).then(()=> {
       this.sb.open('Artist has been succesfully removed.','', {
           duration: 3000,
           panelClass: ['success-snackBar']
         }
       );
      this.closeDialog();
     }).catch((e)=> {
       handleError(e);

     });
    let handleError = (error: any): void => {
      const errorMessage = error.response.data.message;
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
