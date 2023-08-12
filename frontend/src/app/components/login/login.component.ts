import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import axios from "axios";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
              private sharedService: SharedService) {

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
          console.log('zalogowano!');
          if (sessionStorage.getItem('accessToken')){
            this.isLoggedIn = true;
            this.sharedService.isLoggedInStatus = this.isLoggedIn;
            console.log(this.sharedService.isLoggedInStatus)
          }
        })
    }
  }
}
