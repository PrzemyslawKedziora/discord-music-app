import {Component, OnInit} from '@angular/core';
import {SongService} from "../song/song.service";
import {SongModel} from "../../models/song.model";
import {SharedService} from "../../services/shared/shared.service";
import { SongCardComponent } from '../song/song-card/song-card.component';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  loginStatus:boolean = false;
  constructor(public ss: SongService,
              private sharedService : SharedService,
              public userService: UserService) {
    if (this.songs.length == 0) {
      ss.getSongs();
      this.songs = ss.songs;
      console.log(this.songs);
    }
    this.loginStatus = sharedService.isLoggedInStatus;
  }

  numbers: Array<number> = [0, 1, 2,1,1,1,1,1,1,1,5,1,1];

  ngOnInit(): void {
    sessionStorage.getItem('token') ?
      this.sharedService.isLoggedInStatus = true : this.sharedService.isLoggedInStatus=false;

  }

}
