import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import axios from "axios";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/song/snack-bar.component";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar) {
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
  registerStatus!:boolean;
  registerForm: FormGroup;

  onSubmit(): void {
    this.checkForm();
    if(this.isValidated){
      this.handleError(new Error('niewypelniony formularz'))
      throw new Error('niewypelniony formularz');
    }
    else{
      axios.post('http://localhost:4100/api/users/register',this.registerForm.value).then(()=> {
        this.sb.openFromComponent(SnackBarComponent, {
          duration: 2000,
          panelClass: ['success-snackBar']
        });
        this.registerStatus = true;
        this.sharedService.registerUserStatus = this.registerStatus;
        console.log('zarejestrowano uzytkownika', this.registerForm.value)
      }).catch((e)=> {
        this.handleError(e);
      });

    }
  }

  handleError = (error: any): void => {
    this.registerStatus = false;
    this.sharedService.sharedAddingSongStatus = this.registerStatus;
    this.sb.openFromComponent(SnackBarComponent, {
      duration: 3000,
      panelClass: ['failed-snackBar']
    })
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
