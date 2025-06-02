import { Component, inject, signal } from '@angular/core';
import { AddProductComponent } from '../../../features/products/dialogs/add-product/add-product.component';

@Component({
  selector: 'app-header',
  imports: [AddProductComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  addProductVisible = signal<boolean>(false);
  addProduct() {
    this.addProductVisible.set(true);
  }
}
