import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { ProductDetailsComponent } from './features/products/pages/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  },
];
