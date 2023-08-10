import { Injectable } from '@angular/core';
import {SongModel} from "../../models/song.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private _sharedAddingSongStatus!: boolean;
  private _isLoggedInStatus!:boolean;
  private _sharedAddingAuthorStatus!: boolean;
  private _sharedSongsArray!: SongModel[];


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


  get sharedAddingAuthorStatus(): boolean {
    return this._sharedAddingAuthorStatus;
  }

  set sharedAddingAuthorStatus(value: boolean) {
    this._sharedAddingAuthorStatus = value;
  }


  get sharedSongsArray(): SongModel[] {
    return this._sharedSongsArray;
  }

  set sharedSongsArray(value: SongModel[]) {
    this._sharedSongsArray = value;
  }
}
