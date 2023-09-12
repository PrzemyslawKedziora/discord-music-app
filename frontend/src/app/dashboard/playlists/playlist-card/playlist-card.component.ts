import {Component, Input} from '@angular/core';
import {PlaylistModel} from "../../../models/playlist.model";

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {

  @Input() playlist!:PlaylistModel;


}
