import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import axios from "axios";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginSnackBarComponent} from "../snack-bar/login/login-snack-bar.component";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../snack-bar/song/snack-bar.component";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar,
              private router: Router) {

  }

  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  isSubmitted = false;
  isLoggedIn = false;

  onSubmit(): void {
    if (!this.loginForm.invalid) this.isSubmitted=true;
    if (this.isSubmitted){
      console.log('dane: ',this.loginForm.value);
      axios.post('http://localhost:4100/api/users/login',{email: this.loginForm.get('email')?.value,password: this.loginForm.get('password')?.value})
        .then((res) => {
          const token = res.data.accessToken;
          sessionStorage.setItem('accessToken',token);
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          },2000);
          if (sessionStorage.getItem('accessToken')){
            this.isLoggedIn = true;
            this.sharedService.loginUserStatus = this.isLoggedIn;
            console.log(this.isLoggedIn, 'w logine ');
            console.log(this.sharedService.loginUserStatus, 'w statusie ');

          }
          this.sb.openFromComponent(LoginSnackBarComponent,{
            duration: 500,
            panelClass: ['success-snackBar']
          });
        }).catch((e)=> {
          handleError(e);


      });
      let handleError = (error: any): void => {
        this.isLoggedIn = false;
        this.sharedService.loginUserStatus = this.isLoggedIn;
        console.log(error);
        this.sb.openFromComponent(SnackBarComponent, {
          duration: 2000,
          panelClass: ['failed-snackBar']
        })
      }
      console.log('zalogowano!');
    }
  }
}
