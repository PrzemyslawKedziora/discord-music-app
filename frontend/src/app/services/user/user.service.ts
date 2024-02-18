import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, Observable} from "rxjs";
import {ApiResponse} from "../../models/api.response";
import {UserModel} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared/shared.service";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken = sessionStorage.getItem('token');
  headers = {
    Authorization: 'Bearer ' + this.accessToken,
  };
  constructor(private router: Router,
              private sb: MatSnackBar,
              private sharedService: SharedService,
              private http: HttpClient) { }

  login(email:string,password:string): Observable<ApiResponse<UserModel>>{
    return this.http.post<ApiResponse<UserModel>>('https://discord-music-app-backend.vercel.app/api/users/login', {
      email: email,
      password: password
    })
      .pipe<ApiResponse<UserModel>>(catchError((error) => {
        return this.sharedService.handleError(error.error);
      }))
  }
  logOut(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('id');
    this.router.navigate(['/landing-page']);
    this.sb.open('User has been succefully logged out!','',{
      duration:3000,
      panelClass: ['success-snackBar']
    })
  }

  updateUser(userID:string,userForm: FormGroup): Observable<ApiResponse<UserModel>>{
    let urlString ='https://discord-music-app-backend.vercel.app/api/users/'+userID+'/edit';

    return this.http.post<ApiResponse<UserModel>>(urlString,userForm.value,{headers:this.headers}).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err.error);
      })
    )
  }

  registerUser(form: FormGroup): Observable<ApiResponse<UserModel>>{
    return this.http.post<ApiResponse<UserModel>>('https://discord-music-app-backend.vercel.app/api/users/register',form.value).pipe(
      catchError((err)=>{
        return this.sharedService.handleError(err);
      })
    )
  }
}
