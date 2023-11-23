import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSubmitted = false;
  isLoggedIn = false;

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar,
              private router: Router,
              private http: HttpClient) {

  }

  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  onSubmit(): void {
    if (!this.loginForm.invalid) this.isSubmitted=true;
    if (this.isSubmitted){
      this.http.post('https://discord-music-app-backend.vercel.app/api/users/login',{email: this.loginForm.get('email')?.value,password: this.loginForm.get('password')?.value})
        .pipe(catchError((error)=>{
          return this.sharedService.handleError(error);

        })).subscribe((res: any) =>{

        const user: UserModel = {
          _id: res.id,
          username: res.username,
          email: res.email,
          password: res.password,
          profilePicture: res.profilePicture,
          botCommand: res.botCommand,
          token: res.accessToken
        }
        sessionStorage.setItem('user',JSON.stringify(user));
        sessionStorage.setItem('id',user._id);
        sessionStorage.setItem('username',user.username);
        sessionStorage.setItem('token',user.token);
        localStorage.setItem('botCommand',user.botCommand);
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
      });
    }
  }
}
