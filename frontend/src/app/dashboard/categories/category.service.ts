import { Injectable } from '@angular/core';
import axios from "axios";
import {CategoryModel} from "../../models/category.model";
import {AddDialogModel} from "../../models/add-dialog.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  categories!: CategoryModel[];
  dialogData: AddDialogModel={category:[],author:[]};

  getCategories(): Promise<void>{
    return axios.get('https://discord-music-app-backend.vercel.app/api/categories/all').then(
      (res) => {
        let ar:CategoryModel[]=[];
        for (let i = 0; i < res.data.length; i++) {
          ar.push(res.data[i]);
        }
        this.categories = ar;
        this.dialogData.category = this.categories;
      }
    );
  }
}
