import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-products',
  imports: [HeaderComponent, ProductTableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productStore = inject(ProductsStore);
  ngOnInit() {
    this.productStore.getProducts();
    setTimeout(() => {
      console.log(this.productStore.products(),'HERE');
    }, 2000);
  }
}
