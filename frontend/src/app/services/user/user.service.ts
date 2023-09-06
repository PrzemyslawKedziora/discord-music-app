import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router,
              private sb: MatSnackBar) { }

  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
    this.router.navigate(['/landing-page']);
    this.sb.open('User has been succefully loggen out!','',{
      duration:3000,
      panelClass: ['success-snackBar']
    })
  }
}
