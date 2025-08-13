import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../cart/cart.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItemCount$ = this.cartService.items$.pipe(
      map((items: CartItem[]) => items.reduce((acc, item) => acc + item.quantity, 0))
    );
  }

  toggleCart() {
    this.cartService.toggleCart();
  }
}
