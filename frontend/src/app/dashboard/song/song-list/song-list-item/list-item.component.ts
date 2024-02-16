import {Component, Input, OnInit} from '@angular/core';
import {SongModel} from "../../../../models/song.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {SongComponent} from "../../component/song.component";
import {SongService} from "../../song.service";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input() songData!: SongModel[];
  @Input() songRecord!: SongModel;
  @Input() songIndex!: number;
  @Input('botCommand') botCommand!: string;
  expanded:boolean=false;
  isLiked!: boolean;
  isLoggedIn!: boolean;
  user?: any;

  constructor(public sc: SongComponent,
              private sb: MatSnackBar,
              private dialog: MatDialog,
              public ss: SongService) {
  }

  ngOnInit(): void {
    sessionStorage.getItem('user') ? this.isLoggedIn=true : this.isLoggedIn=false;
    this.isLiked = this.ss.checkIsLiked(this.songRecord)
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername !== null) {
      this.user = storedUsername;
    } else {
      console.log('Brak zapisanego użytkownika w sesji.');
    }
  }

  wrongUser() {
    this.sb.open('You cannot delete song that was not added by you!', '', {
      duration: 2000,
      panelClass: ['failed-snackBar']
    });
  }

}
