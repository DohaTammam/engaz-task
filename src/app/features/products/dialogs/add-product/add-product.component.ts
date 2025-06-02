import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-add-product',
  imports: [Dialog, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  visible = model.required<boolean>();

  close(){
    this.visible.set(false);
  }
}
