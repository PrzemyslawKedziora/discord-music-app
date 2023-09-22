import {SongModel} from "./song.model";

export interface PlaylistModel{
  _id:string,
  name:string,
  songs: Array<SongModel>,
  pictureURL:string,
  authorID: {
    _id:string,
    username:string
    },
  likes: any[]
}

export class PlaylistRecord implements PlaylistModel{
    _id: string;
    name: string;
    songs: SongModel[];
    pictureURL: string;
    authorID: {
      _id:string,
      username:string
    };
    likes: any[];


  constructor(id: string, name: string, songs: SongModel[], pictureURL: string, authorID: { _id:string, username:string }, likes: any[]) {
    this._id = id;
    this.name = name;
    this.songs = songs;
    this.pictureURL = pictureURL;
    this.authorID = authorID;
    this.likes = likes;
  }
}
