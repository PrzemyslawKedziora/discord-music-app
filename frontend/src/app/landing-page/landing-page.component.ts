import {OnInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  @ViewChild('imageElement') animationElement!: ElementRef;
  isImageVisible:boolean = false;

  pepeBandGif: string = './assets/peepoband.gif';
  pepeBandJpeg: string = './assets/peepoband.jpg';

  nyanCatSRC: string = './assets/nyan-cat.gif';
  pepeJamSRC: string = './assets/pepe-pepejam.gif';
  pepeBandSRC: string = this.pepeBandJpeg;



  backgroundImageSRC: string = './assets/main-background.jpeg';

  ngOnInit(): void {
    setTimeout(() => {
      this.isImageVisible=true
    },300);
    setTimeout(() => {
      this.pepeBandSRC= this.pepeBandGif;
    },1500);
  }

}
