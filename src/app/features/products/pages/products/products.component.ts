import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { ProductsStore } from '../../store/products.store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  imports: [HeaderComponent, ProductTableComponent, ToastModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [MessageService],
})
export class ProductsComponent {
  productStore = inject(ProductsStore);
  ngOnInit() {
    this.productStore.getProducts();
  }
}
