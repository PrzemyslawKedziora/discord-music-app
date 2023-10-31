import {Component, HostListener} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {SharedService} from "../services/shared/shared.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  loginStatus!:boolean;
  isHidden:boolean=true;


  constructor(public user: UserService,
              public sharedService: SharedService) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.sharedService.checkScreenSize();
    this.isHidden = this.sharedService.isSmallScreen;
  }

  ngOnInit(): void {
    this.sharedService.checkScreenSize();
    this.isHidden = this.sharedService.isSmallScreen;
  }
  isHiddenFun(value:boolean){
    this.isHidden = value;
    this.changeVisibility();
  }

  changeVisibility(){
    this.isHidden = !this.isHidden;
  }
}
