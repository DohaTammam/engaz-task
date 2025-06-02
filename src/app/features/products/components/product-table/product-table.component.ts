import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductsStore } from '../../store/products.store';
import { Rating, RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { UpdateProductComponent } from '../../dialogs/update-product/update-product.component';
import { ViewProductComponent } from '../../dialogs/view-product/view-product.component';
import { Product } from '../../services/products.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-table',
  imports: [
    TableModule,
    CommonModule,
    RatingModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    Rating,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    UpdateProductComponent,
    ViewProductComponent,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  providers: [MessageService],
})
export class ProductTableComponent {
  messageService = inject(MessageService);
  updateProductVisible = signal<boolean>(false);
  viewProductVisible = signal<boolean>(false);
  currentProductId = signal<number>(0);
  selectedProduct = signal<Product | null>(null);
  productStore = inject(ProductsStore);

  updateProduct(id: number) {
    this.updateProductVisible.set(true);
    this.currentProductId.set(id);
  }
  async deleteProduct(id: number) {
    await this.productStore.deleteProduct(id);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product Deleted Successfully',
    });
  }
  viewProduct(product: Product) {
    this.selectedProduct.set(product);
    this.viewProductVisible.set(true);
  }

  titleFilter = signal<string>('');
  categoryFilter = signal<string>('');

  filteredProducts = computed(() => {
    const title = this.titleFilter().toLowerCase();
    const category = this.categoryFilter().toLowerCase();
    return this.productStore
      .products()
      ?.filter(
        (product) =>
          product.title.toLowerCase().includes(title) ||
          product.category.toLowerCase().includes(category)
      );
  });
}
