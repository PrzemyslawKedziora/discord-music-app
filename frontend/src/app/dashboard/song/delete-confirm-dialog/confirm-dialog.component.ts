import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {


  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private sb:MatSnackBar,
    private http: HttpClient,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  deleteSong() {
    const requestString = 'https://discord-music-app-backend.vercel.app/api/songs/' + this.data.songID + '/delete';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.delete(requestString, {headers}).pipe(
      catchError((err) => {
        return this.sharedService.handleError(err);
      })
    ).subscribe(() => {
      const index = this.data.index;
      this.data.songs.splice(index, 1);
      this.close();
      this.sb.open('Song has been succesfully removed', '', {
        duration: 2000,
        panelClass: ['success-snackBar']
      })
    })
  }

  close(){
    this.dialogRef.close();
  }


}
