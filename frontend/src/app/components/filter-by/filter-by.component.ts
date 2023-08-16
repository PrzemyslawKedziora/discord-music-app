import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SongModel} from "../../models/song.model";

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss'],
})
export class FilterByComponent {


  constructor(private dialogRef: MatDialogRef<FilterByComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SongModel[]) {

  }

  filterCategory:string='';
  filterString:string='';

  filterBy(filterData: string, filterCategory: string) {
    this.data = this.data.filter((song) => {
      if (filterCategory === 'author') {
        return song.authorID.name === filterData;
      } else {
        return song.categories.some((cat) => cat.name === filterData);
      }
    });
    if (this.filterCategory != '' && this.filterString != ''){
      this.dialogRef.close(this.data);
    }
  }

  close() {
    this.dialogRef.close();
  }


}
