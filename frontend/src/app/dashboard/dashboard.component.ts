import {Component, OnInit, ViewChild} from '@angular/core';
import { SongModel} from "../models/song.model";
import axios from "axios";
import {MatDialog} from "@angular/material/dialog";
import {NewSongComponent} from "./management-panel/new-song/new-song.component";
import {SongFormComponent} from "./management-panel/song-form/song-form.component";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(public dialog: MatDialog) {
    axios.get('http://localhost:4100/api/songs/all').then((response)=> {
      for (let i=0;i<=response.data.length;i++){
        this.songs.push(response.data[i]);
        console.log(this.songs);
      }
    })
  }

  ngOnInit(): void {
    // console.log(this.songs)
  }
  songs: SongModel[]=[];
  isMuted:boolean=true;
  isLoggedIn: boolean=true;

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
