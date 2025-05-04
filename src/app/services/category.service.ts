import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number,
  name: string,
  description: string
}


@Injectable({
  providedIn: 'root'
})



export class CategoryService {
  private apiUrl = 'http://localhost:9090/api/categories';

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl);
  }
}
