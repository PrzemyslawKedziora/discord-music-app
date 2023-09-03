import { Component } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import axios from "axios";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  user!: UserModel;
  isEditable: boolean = false;
  userForm: FormGroup;
  inputType:string = 'password';
  loginStatus:boolean = false;

  constructor(private fb: FormBuilder,
              private sb: MatSnackBar,
              public userService: UserService) {
    const sessionUser = sessionStorage.getItem('user');
    this.user = JSON.parse(sessionUser!) as UserModel;
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
    let urlString ='http://localhost:4100/api/users/'+this.user._id+'/edit';
    const accessToken = sessionStorage.getItem('token');
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    axios.post(urlString,this.userForm.value,{headers}).then((res)=> {
      sessionStorage.setItem('user',JSON.stringify({
        _id:res.data._id,username: res.data.username,
      email: res.data.email,password:this.userForm.get('password')?.value,
        profilePicture: res.data.profilePicture,botCommand: res.data.botCommand,
        token:res.data.token}));
      this.sb.open('User has been succesfully updated!','',{
        duration: 3000,
        panelClass: ['success-snackBar']
      });
    }).catch((e)=> {
      handleError(e)
    });
    let handleError = (error: any): void => {
      const errorMessage = error.response.data.message;
      console.log(error.response.data.message);
      this.sb.open(errorMessage || 'The URL has wrong format' ,'',{
        duration: 3000,
        panelClass: ['failed-snackBar']
      })
    }
  }

}
