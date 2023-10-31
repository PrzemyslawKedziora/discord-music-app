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
  @Input() isBigScreen!:boolean;
  maxTitleLength:number = 25;
  userID = sessionStorage.getItem('id');
  botCommand!:string;

  constructor(public ss: SongService) {
  }

  ngOnInit(){
   this.botCommand = localStorage.getItem('botCommand') || '';
  }

  onDoubleClick(event: MouseEvent){

    if (this.ss.doubleClickTimeout !== null) {
      clearTimeout(this.ss.doubleClickTimeout);
      this.ss.doubleClickTimeout = null;
      this.ss.like(this.song);
    }
  }





}
