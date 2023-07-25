import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['',Validators.required,Validators.email],
      username: ['',Validators.required,Validators.minLength(3),Validators.maxLength(32)],
      password: ['',Validators.required,Validators.minLength(6),Validators.maxLength(32)],
      confirmPassword: ['',Validators.required],
    })
  }

  isSubmitted: boolean = false;
  passwordsNotConfirmed?: boolean;
  registerForm: FormGroup;


  onSubmit(): void {
    if(this.isSubmitted){
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        this.passwordsNotConfirmed = true;
        console.log(this.registerForm.value.password, '=--=', this.registerForm.value.confirmPassword)
        throw new Error('stop');
      } else {
        this.passwordsNotConfirmed = false;
        console.log('Zarejestrowano użytkownika ', this.registerForm.value);
      }
    }
    else throw new Error('niewypelniony formularz')
  }
}
