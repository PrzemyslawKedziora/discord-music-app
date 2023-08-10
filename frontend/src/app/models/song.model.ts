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
