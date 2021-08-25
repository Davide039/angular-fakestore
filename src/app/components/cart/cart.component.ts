import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Product[] = []

  constructor(private cartService: CartService) {
    var formatter = Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD'
    })
    this.cart = this.cartService.getCart().map((product: Product) => {
      product = { ...product, price: formatter.format(product.price).slice(1), title: product.title.slice(0, 25) }});
  }

  buy(product: Product) {
    alert("You have successfully bought " + product.title + ' for $' + product.price);
    this.cartService.removeCart(product.id)
    var formatter = Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD'
    })
    this.cart = this.cartService.getCart().map((product: Product) => {
      product = { ...product, price: formatter.format(product.price).slice(1), title: product.title.slice(0, 25) }
    });
  }

  remove(id: number) {
    this.cartService.removeCart(id)
    var formatter = Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD'
    })
    this.cart = this.cartService.getCart().map((product: Product) => {
      product = { ...product, price: formatter.format(product.price).slice(1), title: product.title.slice(0, 25) }
    });
  }

  ngOnInit(): void { }
}
