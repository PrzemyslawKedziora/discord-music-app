import {Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {CategoryModel} from "../../models/category.model";
import {SharedService} from "../../services/shared/shared.service";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent{


  constructor(public dashboard: DashboardComponent,
              private sharedService: SharedService)
  {
    this.loginStatus=this.sharedService.isLoggedInStatus;
  }


  @Input() categories!:CategoryModel[];
  loginStatus!:boolean;



}
