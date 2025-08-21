import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisibleSubject.asObservable();

  constructor() { }

  addToCart(item: CartItem) {
    const items = this.itemsSubject.getValue();
    const existingItem = items.find(i => i.product.id === item.product.id && i.size === item.size);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSubject.next(items);
  }

  removeItem(itemToRemove: CartItem) {
    let items = this.itemsSubject.getValue();
    items = items.filter(item => !(item.product.id === itemToRemove.product.id && item.size === itemToRemove.size));
    this.itemsSubject.next(items);
  }

  clearCart() {
    this.itemsSubject.next([]);
  }

  toggleCart() {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.getValue());
  }

  hideCart() {
    this.cartVisibleSubject.next(false);
  }

}
