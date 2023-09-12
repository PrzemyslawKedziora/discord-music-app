import {Component} from '@angular/core';
import {SharedService} from "../../services/shared/shared.service";
import {CategoryService} from "./category.service";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories!: CategoryModel[];
  filteredCategories: CategoryModel[]=[];
  searchQuery!:string;

  constructor(public sharedService: SharedService,
              private categoryService: CategoryService) {
    categoryService.getCategories().then(()=> {
      this.categories = categoryService.categories;
      this.filteredCategories= categoryService.categories;
    });

  }
  filterCategories() {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
