import { Component } from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  constructor(private sharedService: SharedService) {
    this.addingSongStatus = this.sharedService.sharedAddingSongStatus;
  }
  addingSongStatus!:boolean;

}
