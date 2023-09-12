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


  constructor(private router : Router,
              public dialog: MatDialog) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;

  }

  @Input() author!: AuthorModel;
  loginStatus!:boolean;

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
        data: author
      }
    )
  }
}
