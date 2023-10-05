import {Component} from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {AuthorService} from "./author.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent{

  authors: AuthorModel[] = [];
  searchQuery!:string;
  filteredAuthors: AuthorModel[]=[];
  firstCheck:boolean=true;
  loginStatus!:boolean;

  constructor(public authorService: AuthorService,
              public userService: UserService) {
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;

    this.authorService.getAuthors().then(() => {
      this.authors = this.authorService.artists;
      this.filteredAuthors = this.authorService.artists;
      console.log(this.filteredAuthors)
    });
  }

  filterNames() {
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  filterArtists(filterQuery: string){
    const owned = <HTMLInputElement> document.getElementById('show-owned');
    const userID = sessionStorage.getItem('id')
    if (filterQuery =='owned' && owned.checked) {
      this.filteredAuthors = this.authors.filter(author => author.userID == userID)
      this.firstCheck = false;
    }
    else if (!this.firstCheck) {
      this.filteredAuthors = this.authors;
    }
    else this.filterNames()
  }

}
