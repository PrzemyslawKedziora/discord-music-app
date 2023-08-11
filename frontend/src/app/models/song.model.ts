export interface SongModel{
  authorID: {
    _id:string,
    name:string,
  },//artist
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


}
export class SongRecord implements SongModel{
  authorID: { _id: string; name: string; };
  thumbnail: string;
  categories: { _id: string; name: string; }[];
  likes: any[];
  name: string;
  userID: { _id: string; username: string; };
  ytURL: string;


  constructor(authorID: { _id: string; name: string }, thumbnail: string, categories: { _id: string; name: string }[],
              likes: any[], name: string, userID: { _id: string; username: string }, ytURL: string) {
    this.authorID = authorID;
    this.thumbnail = thumbnail;
    this.categories = categories;
    this.likes = likes;
    this.name = name;
    this.userID = userID;
    this.ytURL = ytURL;
  }

  isLiked: boolean = false;
}

