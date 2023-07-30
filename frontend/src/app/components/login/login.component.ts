import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private fb: FormBuilder) {
  }

  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  isSubmitted = false;

  onSubmit(): void {
    if (!this.loginForm.invalid) this.isSubmitted=true;
    if (this.isSubmitted){
      console.log('dane: ',this.loginForm.value);
    }
  }
}
