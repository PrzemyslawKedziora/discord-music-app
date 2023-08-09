import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private _sharedAddingSongStatus!: boolean;
  private _isLoggedInStatus!:boolean;


  set sharedAddingSongStatus(value: boolean) {
    this._sharedAddingSongStatus = value;
  }


  get sharedAddingSongStatus(): boolean {
    return this._sharedAddingSongStatus;
  }


  get isLoggedInStatus(): boolean {
    return this._isLoggedInStatus;
  }

  set isLoggedInStatus(value: boolean) {
    this._isLoggedInStatus = value;
  }
}
