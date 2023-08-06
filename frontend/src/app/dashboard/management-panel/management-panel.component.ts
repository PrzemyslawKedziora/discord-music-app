import {Component} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent {


  constructor(public dashboard: DashboardComponent) {
  }


}
