import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = 'https://fakestoreapi.com/products';
  private readonly http = inject(HttpClient);
  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(this.API_URL);
  }

  addProduct(id: number, title: string, price: number, category: string) {
    const body = {
      id: id,
      title: title,
      price: price,
      category: category,
    };
    return this.http.put<Product>(this.API_URL, body);
  }
  getProductById(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Product>(url);
  }
  updateProduct(id: number, title:string, price:number, category:string) {
    const url = `${this.API_URL}/${id}`;
    const body = { title: title, price: price,category:category};
    return this.http.put<Product>(url, body);
  }
    deleteProduct(id: number) {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete(url);
  }
}
