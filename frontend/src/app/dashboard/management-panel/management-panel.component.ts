import {Component, Input, OnInit} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {CategoryModel} from "../../models/category.model";
import {AuthorModel} from "../../models/author.model";
import {SongService} from "../song/song.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent implements OnInit{

  constructor(public dashboard: DashboardComponent,
              public songService: SongService,
              public userService: UserService)
  {
  }


  @Input() categories!:CategoryModel[];
  @Input() authors!: AuthorModel[];
  loginStatus!:boolean;

  ngOnInit(): void {

    sessionStorage.getItem('id') ? this.loginStatus = true : this.loginStatus = false;
  }



}
