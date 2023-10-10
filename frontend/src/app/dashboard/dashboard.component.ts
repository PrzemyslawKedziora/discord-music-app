import {Component, HostListener} from '@angular/core';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  loginStatus!:boolean;


  constructor(public user: UserService) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;
  }

  isSmallScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }
}
