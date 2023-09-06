import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) { }

  logOut(){
    this.router.navigate(['/landing-page']);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
  }
}
