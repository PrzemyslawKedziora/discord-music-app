import { Component } from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {SongService} from "../song/song.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  authors: AuthorModel[] = [];

  constructor(private songService: SongService) {
    this.songService.getAuthors().then(() => {
      this.authors = this.songService.artists;
      console.log(this.authors);
    });
  }


}
