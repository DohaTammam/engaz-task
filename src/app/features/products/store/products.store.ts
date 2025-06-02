import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../services/products.model';
import { inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { lastValueFrom } from 'rxjs';

interface State {
  products: Product[] | null;
  currentProduct: Product | null;
}

const initialState: State = {
  products: null,
  currentProduct: null,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState<State>(initialState),
  withComputed(({}) => ({})),
  withMethods((store, productService = inject(ProductsService)) => ({
    async getProducts() {
      const products$ = productService.getProducts();
      try {
        const products = await lastValueFrom(products$);
        patchState(store, { products });
      } catch (error) {
        console.error(error);
      }
    },
    async getProductById(id: number) {
      const product$ = productService.getProductById(id);
      try {
        const currentProduct = await lastValueFrom(product$);
        patchState(store, { currentProduct });
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct(
      id: number,
      title: string,
      price: number,
      category: string
    ) {
      const addProduct$ = productService.addProduct(id, title, price, category);
      try {
        const products = await lastValueFrom(addProduct$);
        
        const currentProducts = store.products();
        const updatedProducts = [...(currentProducts ?? []), products];

        patchState(store, { products: updatedProducts });
      } catch (error) {
        console.error(error);
      }
    },
    async updateProduct(
      id: number,
      title: string,
      price: number,
      category: string
    ) {
      const updateProduct$ = productService.updateProduct(
        id,
        title,
        price,
        category
      );
      try {
        const updateProduct = await lastValueFrom(updateProduct$);
        this.getProducts();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteProduct(id: number) {
      const deleteProduct$ = productService.deleteProduct(id);
      try {
        const deleteProduct = await lastValueFrom(deleteProduct$);
        await this.getProducts();
      } catch (error) {
        console.error(error);
      }
    },
  }))
);
