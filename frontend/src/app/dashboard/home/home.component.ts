import {Component,OnInit} from '@angular/core';
import {SongService} from "../song/song.service";
import {SongModel} from "../../models/song.model";
import {SharedService} from "../../services/shared/shared.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songs: SongModel[]=[];
  songsTemp: SongModel[]=[];
  songsSortedByDate: SongModel[]=[];
  isLoggedIn!:boolean;
  constructor(public ss: SongService,
              private sharedService : SharedService,
              public userService: UserService) {
    sessionStorage.getItem('username') ? this.isLoggedIn = true : this.isLoggedIn = false;

    if (this.songs.length == 0) {
      ss.getSongs().then(()=> {
        this.songs = ss.songs;
        this.songsSortedByDate = ss.songs
          .sort((song1,song2)=> Number.parseFloat(song2.createdAt.toString()) - Number.parseFloat(song1.createdAt.toString()))
          .slice(0,6);
        this.songs = this.songs.sort((song1,song2)=> song2.likes.length - song1.likes.length).slice(0,6);
      });
    }
  }

  ngOnInit(): void {
    sessionStorage.getItem('token') ?
      this.sharedService.isLoggedInStatus = true : this.sharedService.isLoggedInStatus=false;

  }



}
