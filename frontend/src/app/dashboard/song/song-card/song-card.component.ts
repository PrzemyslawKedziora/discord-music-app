import {Component, Input} from '@angular/core';
import {SongModel} from "../../../models/song.model";
import {SongService} from "../song.service";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent{

  @Input() song!: SongModel;
  @Input() songData!: SongModel[];
  @Input() songIndex!: number;
  @Input() botCommand!: string;
  @Input() isBigScreen!:boolean;

  constructor(public ss: SongService) {
  }

  maxTitleLength:number = 25;
  userID = sessionStorage.getItem('id');



}
