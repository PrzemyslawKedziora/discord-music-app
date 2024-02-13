import {Component, OnInit} from '@angular/core';
import {AuthorModel} from "../../models/author.model";
import {AuthorService} from "./author.service";
import {UserService} from "../../services/user/user.service";
import {SharedService} from "../../services/shared/shared.service";
import {ApiResponse} from "../../models/api.response";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit{

  authors: AuthorModel[] = [];
  searchQuery!:string;
  filteredAuthors: AuthorModel[]=[];
  firstCheck:boolean=true;
  loginStatus!:boolean;

  constructor(public authorService: AuthorService,
              public userService: UserService,
              public sharedService: SharedService){
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
  }

  ngOnInit(): void {
   this.authorService.getAuthors().subscribe((res: ApiResponse<AuthorModel[]>)=>{
          res.data = res.data.sort((a, b) => a.name.localeCompare(b.name));
          this.authors = res.data;
          this.authorService.dialogData.author = this.authors;
          this.sharedService.sharedArtistsArray = this.authors;
          this.filteredAuthors = this.sharedService.sharedArtistsArray;
    })
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
    else this.filterNames();
  }

}
