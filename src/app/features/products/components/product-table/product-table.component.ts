import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProductsStore } from '../../store/products.store';
import { Rating, RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-product-table',
  imports: [
    TableModule,
    CommonModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    Rating,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
})
export class ProductTableComponent {
  productStore = inject(ProductsStore);
}
