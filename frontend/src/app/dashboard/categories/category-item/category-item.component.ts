import {Component, Input} from '@angular/core';
import {CategoryModel} from "../../../models/category.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent {

  @Input() category!: CategoryModel;
  @Input() index!: number;

  constructor(private router : Router) {
  }

  showCategorySongs(categoryName: string){
    this.router.navigate(['/dashboard',categoryName]);
    console.log(categoryName,'nazwa adfsad')
  }

}
