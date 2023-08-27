import {Component, OnInit} from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {AuthorService} from "./author.service";
import {SharedService} from "../../services/shared/shared.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit{

  authors: AuthorModel[] = [];
  searchQuery!:string;
  filteredAuthors: AuthorModel[]=[];
  loginStatus!:boolean;

  constructor(public authorService: AuthorService,
              public sharedService: SharedService,
              public userService: UserService) {
    this.authorService.getAuthors().then(() => {
      this.authors = this.authorService.artists;
      this.filteredAuthors = this.authorService.artists;
    });
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;

    console.log(this.loginStatus, 'status')
  }

  ngOnInit(): void {
  }


  filterNames() {
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

}
