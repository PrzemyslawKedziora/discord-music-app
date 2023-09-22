import {Component, Input} from '@angular/core';
import {PlaylistModel} from "../../../models/playlist.model";

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {

  @Input() playlist!:PlaylistModel;

  isImgValid():string{
    if (!(this.playlist.pictureURL)){
      return this.playlist.pictureURL = '../../../assets/unknown.png'
    }
    else return this.playlist.pictureURL
  }
}
