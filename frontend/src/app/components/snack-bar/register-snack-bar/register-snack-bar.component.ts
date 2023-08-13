import { Component } from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-register-snack-bar',
  templateUrl: './register-snack-bar.component.html',
  styleUrls: ['../song/snack-bar.component.scss']
})
export class RegisterSnackBarComponent {

  constructor(public sharedService: SharedService) {
    this.sharedService.registerUserStatus = this.registerStatus;

  }

  registerStatus!:boolean;
}
