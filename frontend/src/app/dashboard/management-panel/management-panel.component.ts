import {AfterViewInit, Component, Input} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {CategoryModel} from "../../models/category.model";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent implements AfterViewInit{


  constructor(public dashboard: DashboardComponent) {
  }
  @Input() categories!:CategoryModel[];

  ngAfterViewInit(): void {
    // console.log(this.categories,'  kategorie')
  }


}
