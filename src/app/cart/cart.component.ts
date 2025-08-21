import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.items$;
    this.totalPrice$ = this.cartItems$.pipe(
      map(items => items.reduce((acc, item) => {
        const price = item.product.discountedPrice !== null && item.product.discountedPrice > 0
                      ? item.product.discountedPrice
                      : item.product.sellingPrice;
        return acc + (price * item.quantity);
      }, 0))
    );
  }

  ngOnInit(): void {}

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
    this.cartService.hideCart();
  }

  closeCart(): void {
    this.cartService.hideCart();
  }
}
