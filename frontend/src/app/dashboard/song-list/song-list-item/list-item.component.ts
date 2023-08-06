import {Component, Input} from '@angular/core';
import {SongModel} from "../../../models/song.model";
import {DashboardComponent} from "../../dashboard.component";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

@Input() songData!:SongModel;
@Input() songIndex!:number;

  constructor(public dashboard: DashboardComponent) {

  }


  imgPath:string = 'frontend/src/assets/pepe-the-frog-dance.gif';
isLiked: boolean=false;

like(){
  this.isLiked= !this.isLiked;
  if (this.isLiked) this.songData.likes.length++;
  else this.songData.likes.length--;
}
deleteSong(){

  }
}
