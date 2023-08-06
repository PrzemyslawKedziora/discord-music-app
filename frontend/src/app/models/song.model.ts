export interface SongModel{
  authorID: {
    _id:string,
    name:string,
  },
  thumbnail:string,
  categories:string[],
  likes:any[],
  name:string, //song name
  userID:{
    _id:string,
    username:string
  }, //id of person who added this song
  ytURL:string,
}
