import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit{

  loginStatus:boolean=false;
  windowWidth!:number;
  constructor(public sharedService: SharedService,
              private el: ElementRef) {
    sessionStorage.getItem('user') ? this.loginStatus = true : this.loginStatus = false;
  }

  @ViewChild('element', { static: false }) myElementRef!: ElementRef;

  ngAfterViewInit() {
    this.checkElementWidth(); // Wywołanie funkcji na starcie komponentu

    // Nasłuchiwanie zdarzenia zmiany rozmiaru okna przeglądarki
    window.addEventListener('resize', () => {
      this.checkElementWidth(); // Wywołanie funkcji po zmianie rozmiaru okna
    });
  }

  checkElementWidth() {
    this.windowWidth = this.el.nativeElement.offsetWidth;
    console.log('Szerokość elementu:', this.windowWidth, 'px');
  }
}
