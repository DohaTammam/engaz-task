import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ProductsStore } from '../../store/products.store';

@Component({
  selector: 'app-add-product',
  imports: [Dialog, CommonModule, ReactiveFormsModule, FormsModule, DialogModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  visible = model.required<boolean>();
    productStore = inject(ProductsStore);
    addForm = this.initForm();

  initForm(){
    return new FormGroup ({
      id: new FormControl(null,Validators.required),
      title: new FormControl('',Validators.required),
      price: new FormControl(0,Validators.required),
      category: new FormControl('',Validators.required),
    })
  }
  addProduct(){
   if (this.addForm.valid) {
      this.productStore.updateProduct(
        this.addForm.controls.id.value!,
        this.addForm.controls.title.value!,
        this.addForm.controls.price.value!,
        this.addForm.controls.category.value!
      );
      this.close();
    } else {
      this.addForm  .markAllAsTouched();
    }
  }

  close(){
    this.visible.set(false);
  }
}
