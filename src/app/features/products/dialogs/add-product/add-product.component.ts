import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ProductsStore } from '../../store/products.store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  imports: [
    Dialog,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ToastModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers:[MessageService]
})
export class AddProductComponent {
  visible = model.required<boolean>();
  productStore = inject(ProductsStore);
  messageService = inject(MessageService);
  addForm = this.initForm();

  initForm() {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      title: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      category: new FormControl('', Validators.required),
    });
  }
  async addProduct() {
    if (this.addForm.valid) {
      await this.productStore.updateProduct(
        this.addForm.controls.id.value!,
        this.addForm.controls.title.value!,
        this.addForm.controls.price.value!,
        this.addForm.controls.category.value!
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product Added',
        life: 3000,
      });

      this.close();
    } else {
      this.addForm.markAllAsTouched();
    }
  }

  close() {
    this.visible.set(false);
  }
}
