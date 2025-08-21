import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/cart.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent {
  name: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';

  constructor(private cartService: CartService) {}

  checkoutViaWhatsApp() {
    this.cartService.items$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      const totalPrice = items.reduce((acc, item) => {
        const price = item.product.discountedPrice || item.product.sellingPrice;
        return acc + (price * item.quantity);
      }, 0);

      let message = 'Hello, I would like to order the following items:\n\n';
      items.forEach(item => {
        const price = item.product.discountedPrice || item.product.sellingPrice;
        message += `- ${item.product.name} (Size: ${item.size}, Quantity: ${item.quantity}) - ${price.toFixed(2)}\n`;
      });

      message += `\nTotal Price: ${totalPrice.toFixed(2)}\n\n`;
      message += `Customer Details:\n`;
      message += `Name: ${this.name}\n`;
      message += `Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}\n`;


      const encodedMessage = encodeURIComponent(message);
      const url = `https://api.whatsapp.com/send?phone=+918089325733&text=${encodedMessage}`;
      window.open(url, '_blank');
      this.cartService.clearCart();
      this.cartService.hideCart();
    });
  }
}
