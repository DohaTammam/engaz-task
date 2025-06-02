import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Product } from '../../services/products.model';

@Component({
  selector: 'app-view-product',
  imports: [Dialog,CommonModule],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  visible = model.required<boolean>();
  product = input.required<Product>();
}
