import {Component, Inject} from '@angular/core';
import axios from "axios";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {


  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private sb:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  deleteSong(){
    const requestString = 'http://localhost:4100/api/songs/'+this.data.songID+'/delete';
    const accessToken = sessionStorage.getItem('accessToken');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.delete(requestString,{headers}).then(()=> {
      this.data.songData.splice(this.data.index,1);
      this.sb.open('Song has been succesfully removed','',{
        duration:2000,
        panelClass: ['success-snackBar']
      })
    }).catch((e) => {
      this.sb.open(e.response.data.message,'',{
        duration: 2000,
        panelClass: ['failed-snackBar']
      })
    })
  }

  close(){
    this.dialogRef.close();
  }


}
