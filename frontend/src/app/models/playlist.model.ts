import {SongModel} from "./song.model";
import {AuthorModel} from "./author.model";

export interface PlaylistModel{
  _id:string,
  name:string,
  songs: Array<SongModel[]>,
  pictureURL:string,
  authorID:AuthorModel,
  likes: any[]
}
