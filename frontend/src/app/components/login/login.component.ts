import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isSubmitted = false;
  isLoggedIn = false;
  loginForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required]
  });

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar,
              private router: Router,
              private userService: UserService) {
  }
  onSubmit(): void {
    !this.loginForm.invalid ? this.isSubmitted = false : this.isSubmitted=true;
    if (!this.isSubmitted && this.loginForm) {
      this.userService.login(this.loginForm.get('email')?.value ?? '',
        this.loginForm.get('password')?.value ?? '')
        .subscribe((res) => {
            if (res.success && (res.data as UserModel)) {
            const user: UserModel = res.data;
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('password', this.loginForm.get('password')?.value ?? '');
            sessionStorage.setItem('token', user.accessToken);
            localStorage.setItem('botCommand', user.botCommand);

            if (sessionStorage.getItem('user')) {
              this.isLoggedIn = true;
              this.sharedService.loginUserStatus = this.isLoggedIn;
            }

            setTimeout(() => {
              this.router.navigate(['/dashboard/home']);
            }, 2000);

            this.sb.open('User has been successfully logged in!', '', {
              duration: 1000,
              panelClass: ['success-snackBar']
            });
          }
        });
    }
  }

}
