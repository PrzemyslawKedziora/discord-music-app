import { Component } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs";
import {SharedService} from "../../services/shared/shared.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  user!: UserModel;
  botCommand!:string;
  isEditable: boolean = false;
  userForm: FormGroup;
  inputType:string = 'password';
  loginStatus:boolean = false;

  constructor(private fb: FormBuilder,
              private sb: MatSnackBar,
              public userService: UserService,
              private http: HttpClient,
              private ss: SharedService) {
    const sessionUser = sessionStorage.getItem('user');
    this.user = JSON.parse(sessionUser!) as UserModel;
    this.botCommand = localStorage.getItem('botCommand') || ' ';
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
    this.userForm = this.fb.group({
      username: new FormControl({value: this.user.username,disabled: true}),
      email: new FormControl({value: this.user.email,disabled: true}),
      password: new FormControl({value: this.user.password,disabled: true}),
      profilePicture: new FormControl({value: this.user.profilePicture,disabled: true}),
      botCommand: new FormControl({value: this.user.botCommand,disabled: true})
    })
  }

  isInputDisabled(controlName: string): boolean {
    return this.userForm.get(controlName)!.disabled
  }

  toggleInput(controlName: string): void {
    const control = this.userForm.get(controlName);
    if (control) {
      control.disabled ? control.enable() : control.disable();
    }
  }
  togglePasswordInput(){
    const control = this.userForm.get('password');
    if (control) {
      if(control.disabled) {
        this.inputType = 'text';
        control.enable();
      }
      else {
        control.disable();
        this.inputType = 'password'
      }   }
  }

  updateUser(){
    let urlString ='https://discord-music-app-backend.vercel.app/api/users/'+this.user._id+'/edit';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    this.http.post(urlString,this.userForm.value,{headers}).pipe(
      catchError((err)=>{
        return this.ss.handleError(err);
      })
    ).subscribe((res: UserModel)=> {
      sessionStorage.setItem('user',JSON.stringify({
        _id:res._id,username: res.username,
      email: res.email,password:this.userForm.get('password')?.value,
        profilePicture: res.profilePicture,botCommand: res.botCommand,
        token:res.accessToken}));
      localStorage.setItem('botCommand',res.botCommand);
      this.sb.open('User has been succesfully updated!','',{
        duration: 3000,
        panelClass: ['success-snackBar']
      });
    })
  }

}
