import {Component} from '@angular/core';
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{

  loginStatus:boolean=false;
  windowWidth!:number;
  constructor(public sharedService: SharedService,) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;
  }



}
