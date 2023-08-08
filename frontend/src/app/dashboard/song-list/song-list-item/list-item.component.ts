import {Component, Input, OnInit} from '@angular/core';
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
@Input() categories!: Map<string,string>;
  constructor(public dashboard: DashboardComponent) {}
  isLiked: boolean=false;

  ngOnInit(): void {
    console.log('Categories:', this.songData.categories);
  }

  like(){
  this.isLiked= !this.isLiked;
  if (this.isLiked) this.songData.likes.length++;
  else this.songData.likes.length--;
  }
  deleteSong(){
  }
  openInYT(url:string){
    window.open(url,'_blank');
  }
  getCategoryNameById(categoryId: string): string {
    if (this.categories.has(categoryId)) {
      return this.categories.get(categoryId) || '';
    } else {
      return 'Category not found';
    }
  }

}
