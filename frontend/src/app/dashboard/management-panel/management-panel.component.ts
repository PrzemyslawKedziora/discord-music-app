import {Component, Input, OnInit} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {CategoryModel} from "../../models/category.model";
import {AuthorModel} from "../../models/author.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent implements OnInit{

  constructor(public dashboard: DashboardComponent)
  {
  }


  @Input() categories!:CategoryModel[];
  @Input() authors!: AuthorModel[];
  loginStatus!:boolean;

  ngOnInit(): void {
    sessionStorage.getItem('token') ? this.loginStatus=true : this.loginStatus=false;
  }

  logOut(){
    window.location.reload();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
  }


}
