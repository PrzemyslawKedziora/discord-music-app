import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {AuthorModel} from "../../models/author.model";
import {SongService} from "../song/song.service";
import {UserService} from "../../services/user/user.service";
import {SongComponent} from "../song/component/song.component";


@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss']
})

export class ManagementPanelComponent implements OnInit{

  constructor(public dashboard: SongComponent,
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
