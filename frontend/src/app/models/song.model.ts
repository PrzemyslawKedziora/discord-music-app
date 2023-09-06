export interface SongModel{
  _id:string | '',
  authors: Array<{
    _id:string,
    name:string,
  }>,//artist
  thumbnail:string,
  categories:Array<{
    _id: string;
    name: string;
  }>,
  likes:any[],
  isLiked: boolean,
  name:string, //song name
  userID:{
    _id:string,
    username:string
  }, //id of person who added this song
  ytURL:string,
  createdAt:Date
}
export class SongRecord implements SongModel{
  _id:string;
  authors: Array<{ _id: string; name: string; }>;
  thumbnail: string;
  categories: { _id: string; name: string; }[];
  likes: any[];
  name: string;
  userID: { _id: string; username: string; };
  ytURL: string;
  createdAt:Date;


  constructor(_id:string,authors: Array<{ _id: string; name: string }>, thumbnail: string, categories: { _id: string; name: string }[],
              likes: any[], name: string, userID: { _id: string; username: string }, ytURL: string,createdAt: Date) {
    this._id=_id;
    this.authors = authors;
    this.thumbnail = thumbnail;
    this.categories = categories;
    this.likes = likes;
    this.name = name;
    this.userID = userID;
    this.ytURL = ytURL;
    this.createdAt = createdAt;
  }

  isLiked: boolean = false;
}

