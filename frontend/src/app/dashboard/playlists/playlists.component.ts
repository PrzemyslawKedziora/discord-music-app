import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ShowPlaylistComponent} from "./show-playlist/show-playlist.component";
import {PlaylistModel} from "../../models/playlist.model";
import {AddPlaylistDialogComponent} from "./add-playlist-dialog/add-playlist-dialog.component";
import {PlaylistService} from "./playlist.service";
import {SharedService} from "../../services/shared/shared.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit{

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
              public sharedService : SharedService,
              private http: HttpClient) {


    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
  }

  ngOnInit(): void {
    this.ps.getPlaylists().subscribe((res)=>{
      this.sharedService.sharedPlaylistArray = res.data;
      this.playlists = this.sharedService.sharedPlaylistArray;
      this.playlistsTemp = this.playlists;
    });
  }


  showPlaylist(playlist: PlaylistModel,index:number){
    const APIurl = 'https://discord-music-app-backend.vercel.app/api/playlists/'+playlist._id+'/info';
    this.http.get<PlaylistModel[]>(APIurl).subscribe((res)=>{
      this.dialogContent = res;
    }).add(()=>{
      this.dialog.open(ShowPlaylistComponent,{
            disableClose:true,
            width:'70vw',
            data: {dialog: this.dialogContent,index:index}
          })
    });
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
