import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  sounds:any[]=[
    {
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum'
    },
    {
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum2'
    },{
      url: 'sound1.mp3',
      nazwa: 'lorem ipsum'
    }
  ]
  isMuted:boolean=true;

}
