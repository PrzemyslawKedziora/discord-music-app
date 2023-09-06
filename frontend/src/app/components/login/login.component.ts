import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import axios from "axios";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";

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
          const user: UserModel = {
            _id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            password: res.data.password,
            profilePicture: res.data.profilePicture,
            botCommand: res.data.botCommand,
            token: res.data.accessToken
          }
          sessionStorage.setItem('user',JSON.stringify(user));
          sessionStorage.setItem('id',user._id);
          sessionStorage.setItem('username',user.username);
          sessionStorage.setItem('token',user.token);
          if (sessionStorage.getItem('user')){
            this.isLoggedIn = true;
            this.sharedService.loginUserStatus = this.isLoggedIn;
          }
          setTimeout(() => {
            this.router.navigate(['/dashboard/home'])
          },2000);
          this.sb.open('User has been successfully logged in!','',{
            duration: 1000,
            panelClass: ['success-snackBar']
          });
        }).catch((e)=> {
          handleError(e);


      });
      let handleError = (error: any): void => {
        this.isLoggedIn = false;
        this.sharedService.loginUserStatus = this.isLoggedIn;
        console.log(error);
        this.sb.open(error.response.data.message,'', {
          duration: 2000,
          panelClass: ['failed-snackBar']
        })
      }
      console.log('Logged in!');
    }
  }
}
