import {Component} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ShowPlaylistComponent} from "./show-playlist/show-playlist.component";
import {PlaylistModel} from "../../models/playlist.model";
import axios from "axios";
import {AddPlaylistDialogComponent} from "./add-playlist-dialog/add-playlist-dialog.component";
import {PlaylistService} from "./playlist.service";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent{

  playlists:PlaylistModel[]=[];
  playlistsTemp:PlaylistModel[]=[];
  loginStatus:boolean=false;
  dialogContent!:PlaylistModel[];
  searchQuery!:string;
  firstCheck:boolean = true;
  constructor(
              public userService: UserService,
              public dialog: MatDialog,
              private ps: PlaylistService,
              public sharedService : SharedService) {
    ps.getPlaylists().then(()=>{
      this.playlists = ps.playlists;
      this.playlistsTemp = ps.playlists;
    });

    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
  }

  showPlaylist(playlist: PlaylistModel,index:number){
    const APIurl = 'https://discord-music-app-backend.vercel.app/api/playlists/'+playlist._id+'/info';
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

  filterNames() {
    this.playlistsTemp = this.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  filterPlaylists(filterQuery: string){
    const owned = <HTMLInputElement> document.getElementById('show-owned');
    const liked = <HTMLInputElement> document.getElementById('show-liked');
    const userID = sessionStorage.getItem('id');
    if (filterQuery =='owned' && owned.checked) {
      this.playlistsTemp = this.playlists.filter(playlist => playlist.authorID._id == userID);
      this.firstCheck = false;
    }
    else if (filterQuery =='liked' && liked.checked) {
      this.playlistsTemp = this.playlists.filter(playlist => {return playlist.likes && playlist.likes.includes(userID);});
      this.firstCheck = false;
    }
    else if (!this.firstCheck){
      this.playlistsTemp = this.playlists;
    }
    else this.filterNames();
  }

}
