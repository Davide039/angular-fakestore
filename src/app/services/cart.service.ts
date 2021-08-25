import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Product[]

  getCart(): any {
    return JSON.parse(localStorage.getItem('cart') as string)
  }

  addCart(product: Product) {
    this.cart.push(product)
    localStorage.setItem("cart", JSON.stringify(this.cart))
  }

  removeCart(id: number) {
    const productIdx = this.cart.findIndex(i => i.id == id)
    if (productIdx > -1) {
      this.cart.splice(productIdx, 1)
      localStorage.setItem("cart", JSON.stringify(this.cart))
    }
  }

  constructor() {
    const existingProducts = localStorage.getItem("cart");
    this.cart = JSON.parse(existingProducts as string) || []
  }
}
