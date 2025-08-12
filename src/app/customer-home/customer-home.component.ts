import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerHomeService } from './services/customer-view.service';
import { Category, Product } from './data/product-model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
})
export class CustomerHomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  newlyAddedProducts: Product[] = [];
  specialOfferProducts: Product[] = [];
  categories: Category[] = [];
  sizes: string[] = [];
  searchName: string = '';
  selectedCategory: string = '';
  selectedSize: string = ''; // For size filter
  p: number = 1; // current page for pagination

  // Property to store the product selected for purchase
  selectedProduct: Product | null = null;
  // Renamed for clarity, this is for the size selection in the modal
  selectedSizeInModal: string = '';

  constructor(
    private customerHomeService: CustomerHomeService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.customerHomeService.getHomeData().subscribe(data => {
      this.products = data.products.filter(product => product.canListed === true);

      // Populate newly added and special offer products
      this.newlyAddedProducts = this.products.slice(0, 8);
      this.specialOfferProducts = this.products.slice(8, 16);

      // Extract unique categories from the products
      const categoryMap = new Map<string, Category>();
      this.products.forEach(product => {
        const category = product.category;
        if (category && category.name) {
          if (!categoryMap.has(category.name)) {
            const randomId = Math.floor(Math.random() * 9000) + 1000;
            categoryMap.set(category.name, {
              id: randomId,
              name: category.name,
              description: category.description || ''
            });
          }
        }
      });
      this.categories = Array.from(categoryMap.values());

      // Extract unique, available sizes from the products
      const sizeSet = new Set<string>();
      this.products.forEach(product => {
        product.sizeMap.forEach(sizeEntry => {
          if (sizeEntry.quantity > 0) {
            sizeSet.add(sizeEntry.size);
          }
        });
      });
      this.sizes = Array.from(sizeSet).sort();

      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchName = product.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchCategory = this.selectedCategory
        ? product.category.name === this.selectedCategory
        : true;
      const matchSize = this.selectedSize
        ? product.sizeMap.some(s => s.size === this.selectedSize && s.quantity > 0)
        : true;
      return matchName && matchCategory && matchSize;
    });
    this.p = 1; // reset pagination when filters change
  }

  openBuyModal(product: Product): void {
    this.selectedProduct = product;
    this.selectedSizeInModal = ''; // Reset modal-specific size
  }

  closeBuyModal(): void {
    this.selectedProduct = null;
    this.selectedSizeInModal = '';
  }

  addToCart(): void {
    if (!this.selectedProduct || !this.selectedSizeInModal) {
      alert('Please select a size.');
      return;
    }

    const cartItem: CartItem = {
      product: this.selectedProduct,
      size: this.selectedSizeInModal,
      quantity: 1, // Defaulting to 1, can be extended later
    };

    this.cartService.addToCart(cartItem);
    this.closeBuyModal();
    alert('Product added to cart!'); // Optional: provide feedback to the user
  }
}