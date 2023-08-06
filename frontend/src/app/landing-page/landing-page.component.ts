import {OnInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  @ViewChild('imageElement') animationElement!: ElementRef;
  isImageVisible:boolean = false;
  imageSRC: string = './assets/pepe-pepejam-static.gif';
  ngOnInit(): void {
    setTimeout(() => {
      this.isImageVisible=true
    },300);
    setTimeout(() => {
      this.imageSRC='./assets/pepe-pepejam-tr.gif'
    },1500);
  }

}
