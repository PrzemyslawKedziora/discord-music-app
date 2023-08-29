import { Component, Input } from '@angular/core';
import { SongModel } from 'src/app/models/song.model';

@Component({
  selector: 'app-song-square',
  templateUrl: './song-square.component.html',
  styleUrls: ['./song-square.component.css']
})
export class SongSquareComponent {

  @Input() song!:SongModel;

  isLiked:boolean = true
  numberOfLikes:number = 3  //this.song.likes.length;

  constructor() {
    console.log(this.song);
  }

}
