import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SongModel} from "../../../models/song.model";
import {DashboardComponent} from "../../dashboard.component";

@Component({
  selector: 'song-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit{

@Input() songData!:SongModel;
@Input() songIndex!:number;

@ViewChild('likeElement', {static: true}) likeElement!: ElementRef;
  constructor(public dashboard: DashboardComponent) {}
  isLiked: boolean=false;

  ngOnInit(): void {
    console.log('Categories:', this.songData.categories);
  }

  like(){
  if (this.dashboard.isLoggedIn){
    this.isLiked= !this.isLiked;
    if (this.isLiked) this.songData.likes.length++;
    else this.songData.likes.length--
  }
  }

  deleteSong(){
  }
  openInYT(url:string){
    window.open(url,'_blank');
  }


}
