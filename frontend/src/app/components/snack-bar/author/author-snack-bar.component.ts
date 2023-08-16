import { Component } from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './author-snack-bar.component.html',
  styleUrls: ['../song/snack-bar.component.scss']
})
export class AuthorSnackBarComponent {
  constructor(private sharedService: SharedService) {
    this.addingAuthorStatus = this.sharedService.sharedAddingAuthorStatus;
  }
  addingAuthorStatus!:boolean;

}
