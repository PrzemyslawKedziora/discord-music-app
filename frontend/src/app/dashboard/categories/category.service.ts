import { Injectable } from '@angular/core';
import {CategoryModel} from "../../models/category.model";
import {AddDialogModel} from "../../models/add-dialog.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../models/api.response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories!: CategoryModel[];
  dialogData: AddDialogModel={category:[],author:[]};

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ApiResponse<CategoryModel[]>> {
    return this.http.get<ApiResponse<CategoryModel[]>>('https://discord-music-app-backend.vercel.app/api/categories/all');
  }
}
