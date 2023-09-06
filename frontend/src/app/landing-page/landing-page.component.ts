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
  pepeBandJpeg: string = './assets/peepoband-s.gif';

  nyanCatSRC: string = './assets/nyan-cat.gif';
  pepeJamSRC: string = './assets/pepe-pepejam.gif';
  pepeBandSRC: string = this.pepeBandJpeg;
  backgroundImageSRC: string = './assets/main-background.jpeg';
  isPlaying:boolean=false;
  nyanCatAudio = new Audio('./assets/NyanCatSound.mp3');
  playNyanCat() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying){
      this.nyanCatAudio.play();
    }
    else {
      this.nyanCatAudio.pause();
      this.nyanCatAudio.currentTime=0;
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isImageVisible=true
    },300);
    setTimeout(() => {
      this.pepeBandSRC= this.pepeBandGif;
    },1500);
  }

}
