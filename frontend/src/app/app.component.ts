import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  sounds:any[]=[
    {
      url: 'sound1.mp3',
      nazwa: 'xd'
    },
    {
      url: 'sound1.mp3',
      nazwa: 'xd2'
    },{
      url: 'sound1.mp3',
      nazwa: 'xd3'
    }
    ]
  cisza:boolean=true;
}
