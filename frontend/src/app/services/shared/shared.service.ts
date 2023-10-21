import { Injectable } from '@angular/core';
import {SongModel} from "../../models/song.model";
import {AuthorModel} from "../../models/author.model";
import {Observable, Subject} from "rxjs";
import {UserModel} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private _sharedAddingSongStatus!: boolean;
  private _isLoggedInStatus!:boolean;
  private _sharedAddingAuthorStatus!: boolean;
  private _sharedSongsArray!: SongModel[];
  private _sharedArtistsArray!: AuthorModel[];
  private newAuthorSubject = new Subject<AuthorModel>();
  private _loginUserStatus!:boolean;
  private _registerUserStatus!:boolean;
  public _filterStatus!:boolean;
  private _user!: UserModel;
  private _isSmallScreen=false;



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


  get sharedArtistsArray(): AuthorModel[] {
    return this._sharedArtistsArray;
  }

  set sharedArtistsArray(value: AuthorModel[]) {
    this._sharedArtistsArray = value;
  }


  getNewAuthor(): Observable<AuthorModel> {
    return this.newAuthorSubject.asObservable();
  }

  addNewAuthor(newAuthor: AuthorModel) {
    this.newAuthorSubject.next(newAuthor);
  }


  get loginUserStatus(): boolean {
    return this._loginUserStatus;
  }

  set loginUserStatus(value: boolean) {
    this._loginUserStatus = value;
  }


  get registerUserStatus(): boolean {
    return this._registerUserStatus;
  }

  set registerUserStatus(value: boolean) {
    this._registerUserStatus = value;
  }


  get filterStatus(): boolean {
    return this._filterStatus;
  }

  set filterStatus(value: boolean) {
    this._filterStatus = value;
  }


  get user(): UserModel {
    return this._user;
  }

  set user(value: UserModel) {
    this._user = value;
  }

  checkScreenSize(): void {
    this._isSmallScreen = window.innerWidth < 1400;
  }


  get isSmallScreen(): boolean {
    return this._isSmallScreen;
  }

  set isSmallScreen(value: boolean) {
    this._isSmallScreen = value;
  }
}
