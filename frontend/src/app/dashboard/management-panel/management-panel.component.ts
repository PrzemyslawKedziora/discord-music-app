import {Component, Input, OnInit} from '@angular/core';
import {DashboardComponent} from "../dashboard.component";
import {CategoryModel} from "../../models/category.model";
import {AuthorModel} from "../../models/author.model";
import {SongService} from "../song/song.service";
import {UserService} from "../../services/user.service";
import {SharedService} from "../../services/shared/shared.service";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent implements OnInit{

  constructor(public dashboard: DashboardComponent,
              public songService: SongService,
              public userService: UserService,
              private sharedService: SharedService)
  {
  }


  @Input() categories!:CategoryModel[];
  @Input() authors!: AuthorModel[];
  loginStatus!:boolean;

  ngOnInit(): void {

    this.sharedService.isLoggedInStatus = this.loginStatus;
  }



}
