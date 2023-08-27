import {Component, OnInit} from '@angular/core';
import {SongService} from "../song/song.service";
import {SongModel} from "../../models/song.model";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  constructor(public ss: SongService,
              private sharedService : SharedService) {
    if (this.songs.length == 0) {
      ss.getSongs();
      this.songs = ss.songs;
      console.log(this.songs);
    }
  }

  ngOnInit(): void {
    sessionStorage.getItem('token') ?
      this.sharedService.isLoggedInStatus = true : this.sharedService.isLoggedInStatus=false;

  }

}
