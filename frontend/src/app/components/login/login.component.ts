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
      axios.post('http://localhost:4100/api/users/login',{email: this.loginForm.get('email')?.value,password: this.loginForm.get('password')?.value})
        .then((res) => {
          const user = {
            id: res.data.id,
            username: res.data.username,
            token: res.data.accessToken
          }
          sessionStorage.setItem('id',user.id);
          sessionStorage.setItem('username',user.username);
          sessionStorage.setItem('token',user.token);
          if (sessionStorage.getItem('user')){
            this.isLoggedIn = true;
            this.sharedService.loginUserStatus = this.isLoggedIn;
          }
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          },2000);
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
