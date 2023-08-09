import {AuthorModel} from "./author.model";
import {CategoryModel} from "./category.model";

export interface AddDialogModel{
  author: AuthorModel[],
  category: CategoryModel[]
}
