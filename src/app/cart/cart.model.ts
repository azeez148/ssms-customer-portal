import { Product } from '../customer-home/data/product-model';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}
