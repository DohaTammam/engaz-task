import { CommonModule } from '@angular/common';
import { Component, inject, input, model } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-update-product',
  imports: [
    Dialog,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    InputTextModule,
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss',
})
export class UpdateProductComponent {
  visible = model.required<boolean>();
  productStore = inject(ProductsStore);
  productId = input.required<number>();
  updateForm = this.initForm();

  initForm() {
    return new FormGroup({
      title: new FormControl(''),
      price: new FormControl(0),
      category: new FormControl(''),
    });
  }

  updateProduct() {
    if (this.updateForm.valid) {
      this.productStore.updateProduct(
        this.productId(),
        this.updateForm.controls.title.value!,
        this.updateForm.controls.price.value!,
        this.updateForm.controls.category.value!
      );
      this.close();
    } else {
      this.updateForm.markAllAsTouched();
    }
  }

  close() {
    this.visible.set(false);
  }
}
