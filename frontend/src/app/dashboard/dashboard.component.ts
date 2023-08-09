import {AfterViewInit, Component} from '@angular/core';
import { SongModel} from "../models/song.model";
import axios from "axios";
import {MatDialog} from "@angular/material/dialog";
import {NewSongComponent} from "./management-panel/new-song/new-song.component";
import {CategoryModel} from "../models/category.model";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {

    axios.get('http://localhost:4100/api/songs/all').then((response)=> {
      for (let i=0;i<response.data.length;i++){
        this.songs.push(response.data[i]);
      }
    });
    axios.get('http://localhost:4100/api/categories/all').then(
      (res) => {
        let ar:CategoryModel[]=[];
        let categoryMap = new Map();
        for (let i = 0; i < res.data.length; i++) {
          ar.push(res.data[i]);
          categoryMap.set(ar[i]._id,ar[i].name)
        }
        console.log(categoryMap);
        this.categories = ar;

      }
    );
  }

  ngAfterViewInit(): void {
  }
  categories!: CategoryModel[];
  songs: SongModel[]=[];
  isMuted:boolean=true;
  isLoggedIn: boolean=true;

  addSong(){
    const dialogRef = this.dialog.open(NewSongComponent, {
      disableClose: true,
      width:'100vw',
      data: this.categories
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  addArtist(){

  }
}
