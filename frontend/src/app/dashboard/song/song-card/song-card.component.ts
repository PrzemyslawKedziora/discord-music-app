import {Component, Input} from '@angular/core';
import {SongModel} from "../../../models/song.model";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss']
})
export class SongCardComponent {

  @Input() song!: SongModel;

  calcAuthorsLength(authors: {_id:string,name:string}[]){
    let length = 0;
    for (let author of authors){
        length+= author.name.length;
    }
    return length;
  }
}
