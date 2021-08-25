import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe((products: Product[]) => {
        var formatter = Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD'
        })
        this.products = products.map((product: Product) =>
          product = { ...product, price: formatter.format(product.price).slice(1), title: product.title.slice(0, 25) });
      })
  }
}
