import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      username: ['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(16)]],
      confirmPassword: ['',Validators.required],
    },
      {validator: this.matchValuesValidator('password', 'confirmPassword')}
    )
  }


  isValidated!: boolean;
  passwordsNotConfirmed!: boolean;
  registerForm: FormGroup;

  onSubmit(): void {
    this.checkForm();
    if(this.isValidated){
      throw new Error('niewypelniony formularz')
    }
    else{
      axios.post('http://localhost:4100/api/users/register',this.registerForm.value);
      console.log('zarejestrowano uzytkownika', this.registerForm.value)
    }
  }

   matchValuesValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.get(controlName)?.value;
      const matchingControlValue = control.get(matchingControlName)?.value;

      if (!matchingControlValue) {
        return null;
      }

      if (controlValue !== matchingControlValue) {
        return { matchValues: true };
      }

      return null;
    };
  }
  checkForm(){
    this.isValidated = (this.registerForm.get('email')?.value == '' ||
      this.registerForm.get('username')?.value == '' || this.registerForm.get('password')?.value == ''
      || this.registerForm.get('confirmPassword')?.value == '');
  }
}
