import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./components/shared/footer/footer.component";
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ssms-customer-portal';
  isCartVisible$: Observable<boolean>;

  constructor(private cartService: CartService) {
    this.isCartVisible$ = this.cartService.cartVisible$;
  }
}
