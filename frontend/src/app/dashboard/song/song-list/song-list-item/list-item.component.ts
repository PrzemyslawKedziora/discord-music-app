import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SongModel} from "../../../../models/song.model";
import {DashboardComponent} from "../../../dashboard.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../delete-confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{

@Input() songData!:SongModel[];
@Input() songRecord!:SongModel;
@Input() songIndex!:number;

@ViewChild('likeElement', {static: true}) likeElement!: ElementRef;
  constructor(public dashboard: DashboardComponent,
              private sb: MatSnackBar,
              private dialog: MatDialog) {
  }
  isLiked: boolean=false;
  user?: any;

  ngOnInit(): void {

    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername !== null) {
      this.user = storedUsername;
    } else {
      console.log('Brak zapisanego użytkownika w sesji.');
    }
  }



  like(song: SongModel) {
    song.isLiked=false;
    if (this.dashboard.isLoggedIn) {
      this.isLiked = !this.isLiked;
      const changeAmount = this.isLiked ? 1 : -1;

     song.likes.length += changeAmount;
    }
  }

  openConfirmDeleteDialog(songID:string,index: number){

      this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '50%',
        data: {songs: this.songData, songID: songID, index: index}
      })

  }


  openInYT(url:string){
    window.open(url,'_blank');
  }

  onClick(){
    this.sb.open('Song URL has been successfully copied to clipboard.','',{
      duration: 2000,
      panelClass: ['success-snackBar']
    });
  }

  wrongUser(){
    this.sb.open('You cannot delete song that was not added by you!','',{
      duration: 2000,
      panelClass: ['failed-snackBar']
    });
  }

}
