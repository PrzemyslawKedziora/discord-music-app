export interface AuthorModel{
  _id:string
  name:string,
  pictureURL:string,
  userID:string //user who adds artist
}
export class AuthorRecord implements AuthorModel{
  _id: string;
  name:string;
  pictureURL:string;
  userID:string //user who adds artist


  constructor(_id:string, name: string, pictureURL: string, userID: string) {
    this._id = _id;
    this.name = name;
    this.pictureURL = pictureURL;
    this.userID = userID;
  }


}
