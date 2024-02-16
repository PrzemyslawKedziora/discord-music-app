import {Component, Input} from '@angular/core';
import {SongModel} from "../../../models/song.model";
import {SongService} from "../song.service";
import {UserModel} from "../../../models/user.model";

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
  @Input() copyMode!:string;
  maxTitleLength = 25;
  userID = '';
  botCommand!:string;
  contextMenuVisible: boolean = false;

  constructor(public ss: SongService) {
    const userDataString = sessionStorage.getItem('user');
    if (userDataString) {
      const userData: UserModel = JSON.parse(userDataString);
      this.userID = userData.id
    } else {
      console.error('Brak danych w sessionStorage');
    }
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


  onContextMenu(event: MouseEvent, song: SongModel): void {
    event.preventDefault();
    this.contextMenuVisible = !this.contextMenuVisible;
    return;
  }

  protected readonly oncontextmenu = oncontextmenu;
}
