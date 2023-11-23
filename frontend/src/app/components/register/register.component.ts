import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared/shared.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, Subscription} from "rxjs";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy{

  req$!:Subscription;
  isValidated!: boolean;
  passwordsNotConfirmed!: boolean;
  registerStatus!:boolean;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private sharedService: SharedService,
              private sb: MatSnackBar,
              private router: Router,
              private http: HttpClient) {

    this.registerForm = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      username: ['',[Validators.required,Validators.minLength(3)]],
      password: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(16)]],
      confirmPassword: ['',Validators.required],
    },
      {validator: this.matchValuesValidator('password', 'confirmPassword')}
    )
  }

  ngOnDestroy(): void {
    this.req$.unsubscribe();
  }


  onSubmit(): void {
    this.checkForm();
    if(this.isValidated){
      this.handleError(new Error('niewypelniony formularz'))
      throw new Error('niewypelniony formularz');
    }
    else{
     this.req$ =  this.http.post('https://discord-music-app-backend.vercel.app/api/users/register',this.registerForm.value).pipe(
        catchError((err)=>{
          return this.sharedService.handleError(err);
        })
      ).subscribe(()=>{
        this.sb.open('User has been successfully registered!\n Please,log in.','', {
              duration: 3000,
              panelClass: ['success-snackBar']
            });
            this.registerStatus = true;
            this.sharedService.registerUserStatus = this.registerStatus;
            setTimeout(()=>{
              this.router.navigate(['/login'])
            },3000)
      })
    }
  }

  handleError = (error: any): void => {
    this.registerStatus = false;
    this.sharedService.sharedAddingSongStatus = this.registerStatus;
    this.sb.open(error.error.message,'', {
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
