import {Component, Input} from '@angular/core';
import {AuthorModel} from "../../../models/author.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {


  constructor(private router : Router) {
  }

  @Input() author!: AuthorModel;


  isImgValid():string{
    if (!(this.author.pictureURL)){
      return this.author.pictureURL = '../../../assets/unknown.png'
    }
    else return this.author.pictureURL
  }

  showAuthorSongs(authorName: string){
    this.router.navigate(
      ['/dashboard',authorName]
    )
  }

  deleteAuthor(author:string){

  }
}
