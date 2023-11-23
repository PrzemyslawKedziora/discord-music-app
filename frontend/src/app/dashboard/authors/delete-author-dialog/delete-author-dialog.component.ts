import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthorModel} from "../../../models/author.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-delete-author-dialog',
  templateUrl: './delete-author-dialog.component.html',
  styleUrls: ['./delete-author-dialog.component.scss']
})
export class DeleteAuthorDialogComponent {

  private apiUrl = 'https://discord-music-app-backend.vercel.app/api/authors/'+this.data.author._id+'/delete';
  titleString!:string;

  constructor(
    private dialogRef: MatDialogRef<DeleteAuthorDialogComponent>,
    private http: HttpClient,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: {author: AuthorModel, authors:AuthorModel[],index:number},
              private sb: MatSnackBar) {
    this.titleString = 'Do not you really need '+this.data.author.name+' in your team?';
    console.log(this.data.authors.indexOf(this.data.author))
  }

  deleteAuthor(){
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.delete(this.apiUrl,{headers}).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err);
      })
    ).subscribe(()=>{
      this.data.authors.splice(this.data.authors.indexOf(this.data.author),1);
      this.sharedService.sharedArtistsArray.splice(this.data.index,1);
      this.sb.open('Artist has been succesfully removed.','', {
          duration: 3000,
          panelClass: ['success-snackBar']
        }
      );
      this.closeDialog();
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
