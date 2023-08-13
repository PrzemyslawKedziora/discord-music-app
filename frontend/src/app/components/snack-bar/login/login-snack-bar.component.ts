import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login-snack-bar.component.html',
  styleUrls: ['./login-snack-bar.component.scss']
})
export class LoginSnackBarComponent implements OnInit{

  loginStatus!:boolean;

  constructor(public sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.loginStatus = this.sharedService.loginUserStatus;
  }


}
