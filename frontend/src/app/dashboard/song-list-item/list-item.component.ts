import {Component, Input} from '@angular/core';
import {SongModel} from "../../models/song.model";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

@Input() songData!:SongModel;
@Input() songIndex!:number;

imgPath:string = 'frontend/src/assets/pepe-the-frog-dance.gif';
isLiked: boolean=false;

like(){
  this.isLiked= !this.isLiked;
  console.log('zmiana')
}
}
