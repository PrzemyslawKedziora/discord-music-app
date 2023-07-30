import { Component} from '@angular/core';
import { SongModel} from "../models/song.model";
import axios from "axios";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  constructor() {
    axios.get('http://localhost:4100/api/songs/all').then((response)=> {
      console.log(response.data);
      for (let i=0;i<=response.data.length;i++){
        this.songs.push(response.data[i]);
      }
    })
  }


  songs: SongModel[]=[];
  sounds:any[]=[
    {
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum'
    },
    {
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum2'
    },{
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum'
    }
  ]
  isMuted:boolean=true;



}
