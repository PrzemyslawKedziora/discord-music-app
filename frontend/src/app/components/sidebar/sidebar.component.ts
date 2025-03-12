import {Component, EventEmitter, Output} from '@angular/core';
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{

  @Output() sideBarEvent = new EventEmitter<boolean>;
  loginStatus:boolean=false;
  windowWidth!:number;
  isVisible=false;
  constructor(public sharedService: SharedService) {
   this.loginStatus = !!sessionStorage.getItem('user');
  }

  hideSidebar(){
    this.sideBarEvent.emit(this.isVisible);
  }

}
