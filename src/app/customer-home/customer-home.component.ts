import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerHomeService } from './services/customer-view.service';
import { Category, Product } from './data/product-model';

@Component({
  selector: 'app-customer-home',
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.css'
})
export class CustomerHomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  searchName: string = '';
  selectedCategory: Category | string = '';
  p: number = 1; // current page for pagination

  // Property to store the product selected for purchase
  selectedProduct: Product | null = null;
  // New property for the selected size
  selectedSize: string = '';

  constructor(private customerHomeService: CustomerHomeService) { }

  ngOnInit(): void {
    this.customerHomeService.getHomeData().subscribe(data => {
      this.products = data.products.filter(product => product.canListed === true);

      // iterate over products and fetch images if needed
      this.products.forEach(product => {
        this.customerHomeService.getProductImage(product.id).subscribe(imageBlob => {
          const reader = new FileReader();
          reader.onload = () => {
            product.imageUrl = reader.result as string; // Assuming product.image is a string URL
          };
          reader.readAsDataURL(imageBlob);
        });

      // Assuming product.category is of type Category, update as needed
      this.categories = Array.from(new Set(this.products.map(p => p.category)));
      this.applyFilters();
    });
  });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchName = product.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchCategory = this.selectedCategory
        ? product.category === (typeof this.selectedCategory === 'string' ? this.selectedCategory : this.selectedCategory)
        : true;
      return matchName && matchCategory;
    });
    this.p = 1; // reset pagination when filters change
  }

  openBuyModal(product: Product): void {
    this.selectedProduct = product;
    // Reset the size selection when modal opens
    this.selectedSize = '';
  }

  closeBuyModal(): void {
    this.selectedProduct = null;
    this.selectedSize = '';
  }

  orderViaWhatsApp(product: Product): void {
    if (!this.selectedSize) {
      alert('Please select a size before ordering.');
      return;
    }
    const message = encodeURIComponent(`Hello, I would like to order ${product.name} with selected size ${this.selectedSize} at ${product.sellingPrice}.`);
    // Replace the phone number with your WhatsApp number
    const url = `https://api.whatsapp.com/send?phone=+918089325733&text=${message}`;
    window.open(url, '_blank');
    this.closeBuyModal();
  }
}