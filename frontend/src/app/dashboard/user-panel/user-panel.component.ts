import { Component } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user/user.service";
import {ApiResponse} from "../../models/api.response";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent {

  user!: UserModel;
  botCommand!:string;
  userForm: FormGroup;
  inputType:string = 'password';
  loginStatus:boolean = false;
  fieldActivationMap: { [key: string]: boolean } = {};
  constructor(private fb: FormBuilder,
              private sb: MatSnackBar,
              public userService: UserService,) {

    const sessionUser = sessionStorage.getItem('user');
    this.user = JSON.parse(sessionUser!) as UserModel;
    this.botCommand = localStorage.getItem('botCommand') || ' ';
    sessionStorage.getItem('username') ? this.loginStatus = true : this.loginStatus = false;
    this.userForm = this.fb.group({
      username: new FormControl({value: this.user.username,disabled: true}),
      email: new FormControl({value: this.user.email,disabled: true}),
      password: new FormControl({value: sessionStorage.getItem('password'),disabled: true}),
      profilePicture: new FormControl({value: this.user.profilePicture,disabled: true}),
      botCommand: new FormControl({value: this.user.botCommand,disabled: true}),
      copyMode: new FormControl({value: this.user.copyMode,disabled: true})
    })
  }

  toggleInput(controlName: string): void {
    const control = this.userForm.get(controlName);
    if (control) {
      control.disabled ? control.enable() : control.disable();
      this.inputType = control.disabled && controlName === 'password' ? 'password' : 'text';
      this.fieldActivationMap[controlName] = control.enabled;
    }
  }

  updateUser(){
    this.userService.updateUser(this.user.id,this.userForm)
      .subscribe((res: ApiResponse<UserModel>)=> {
        let userObject: any = {
          id: this.user.id,
          username: res.data.username,
          email: res.data.email,
          password: this.userForm.get('password')?.value,
          profilePicture: res.data.profilePicture,
          botCommand: res.data.botCommand,
          copyMode: res.data.copyMode
        };
        if (res.data.accessToken) {
          userObject.token = res.data.accessToken;
        }

        sessionStorage.setItem('user', JSON.stringify(userObject));

      localStorage.setItem('botCommand',res.data.botCommand);
      localStorage.setItem('copyMode',res.data.copyMode);
      this.sb.open('User has been succesfully updated!','',{
        duration: 3000,
        panelClass: ['success-snackBar']
      });
    })
  }

  protected readonly sessionStorage = sessionStorage;
  protected readonly console = console;
}
