import {Component, Input} from '@angular/core';
import {AuthorModel} from "../../../models/author.model";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {


  constructor(private router : Router,
              private ss : SharedService) {
    console.log(ss.sharedArtistsArray)
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
}
