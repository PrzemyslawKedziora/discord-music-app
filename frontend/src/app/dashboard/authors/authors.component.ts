import {Component} from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {AuthorService} from "./author.service";
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {FilterByComponent} from "../song/filter-by/filter-by.component";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent{

  authors: AuthorModel[] = [];
  searchQuery!:string;
  filteredAuthors: AuthorModel[]=[];
  loginStatus!:boolean;

  constructor(public authorService: AuthorService,
              public userService: UserService,
              private dialog: MatDialog) {
    this.authorService.getAuthors().then(() => {
      this.authors = this.authorService.artists;
      this.filteredAuthors = this.authorService.artists;
    });
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;

    console.log(this.loginStatus, 'status')
  }

  filterNames() {
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
  deleteAuthor(){
    this.dialog.open(FilterByComponent, { disableClose: true})
  }

}
