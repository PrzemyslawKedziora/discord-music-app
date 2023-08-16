export interface AuthorModel{
  name:string,
  pictureURL:string,
  userID:string //user who adds artist
}
export class AuthorRecord implements AuthorModel{
  name:string;
  pictureURL:string;
  userID:string //user who adds artist


  constructor(name: string, pictureURL: string, userID: string) {
    this.name = name;
    this.pictureURL = pictureURL;
    this.userID = userID;
  }
}
