import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ShowPlaylistComponent} from "./show-playlist/show-playlist.component";
import {PlaylistModel} from "../../models/playlist.model";
import axios from "axios";
import {AddPlaylistDialogComponent} from "./add-playlist-dialog/add-playlist-dialog.component";
import {PlaylistService} from "./playlist.service";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent{

  playlists:PlaylistModel[]=[];
  loginStatus:boolean=false;
  dialogContent!:PlaylistModel[];
  constructor(
              public userService: UserService,
              public dialog: MatDialog,
              private ps: PlaylistService) {
    ps.getPlaylists().then(()=>{
      this.playlists = ps.playlists;
    });

    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
  }

  showPlaylist(playlist: PlaylistModel,index:number){
    const APIurl = 'http://localhost:4100/api/playlists/'+playlist._id+'/info';
    axios.get(APIurl).then(res => {
      this.dialogContent = res.data;
    }).then(()=> {
      this.dialog.open(ShowPlaylistComponent,{
        disableClose:true,
        width:'70vw',
        data: {dialog: this.dialogContent,index:index}
      })
    })

  }

  openAddPlaylistDialog(){
    this.dialog.open(AddPlaylistDialogComponent,{
      disableClose:true,
      width:'70vw',
      data: this.dialogContent
    })
  }

}
