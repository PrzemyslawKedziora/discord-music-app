import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ShowPlaylistComponent} from "./show-playlist/show-playlist.component";
import {PlaylistModel} from "../../models/playlist.model";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent{

  playlists:PlaylistModel[]=[];
  loginStatus:boolean=false;
  constructor(private http: HttpClient,
              public userService: UserService,
              public dialog: MatDialog) {
    this.http.get<PlaylistModel[]>('http://localhost:4100/api/playlists/all').subscribe(res=>{
      this.playlists = res;
      console.log(res)
    });
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
  }

  showPlaylist(){
    this.dialog.open(ShowPlaylistComponent,{
        disableClose:true,
        width:'70vw'
      }


    )
  }


}
