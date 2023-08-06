import {Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {SongFormComponent} from "./song-form/song-form.component";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent {


  constructor(public dashboard: DashboardComponent) {
  }


}
