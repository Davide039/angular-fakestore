import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;

  title: string = '';
  description: string = '';
  comments: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      const existingComments = localStorage.getItem(`comments${params.get("id")}`);
      this.comments = JSON.parse(existingComments as string) || [];
    })
  }

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params: any) =>
      this.productsService
        .getProduct(params.get('id'))
        .subscribe((product: Product) => {
          var formatter = Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          })
          this.product = {...product, price: formatter.format(product.price).slice(1)}
        }))
  }

  buyProduct(): void {
    alert(
      'You have successfully bought ' +
        this.product.title +
        ' for $' +
        this.product.price
    );
  }

  addToCart() {
    this.cartService.addCart(this.product);
  }

  addReview() {
    if (this.title && this.description) {
      this.comments.push({
        title: this.title,
        description: this.description,
      });
      localStorage.setItem(
        `comments${this.product.id}`,
        JSON.stringify(this.comments)
      );
      this.title = '';
      this.description = '';
    } else {
      alert("Please fill all the fields")
    }
  }
}
