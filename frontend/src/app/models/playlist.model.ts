import {SongModel} from "./song.model";
import {UserModel} from "./user.model";

export interface PlaylistModel{
  _id:string,
  name:string,
  songs: Array<SongModel>,
  pictureURL:string,
  authorID:UserModel,
  likes: any[]
}
