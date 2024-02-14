import {Component, Input} from '@angular/core';
import {AuthorModel} from "../../../models/author.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAuthorDialogComponent} from "../delete-author-dialog/delete-author-dialog.component";

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent {

  @Input() author!: AuthorModel;
  @Input() authors!:AuthorModel[];
  @Input() index!:number;
  loginStatus!:boolean;
  userID = sessionStorage.getItem('id')

  constructor(private router : Router,
              public dialog: MatDialog) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;
  }

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

  deleteAuthor(author: AuthorModel){
    this.dialog.open(DeleteAuthorDialogComponent, {
        width: '30vw',
        disableClose: true,
        data: {author: author, authors: this.authors, index: this.index}
      }
    )
  }
}
