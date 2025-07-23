export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  sizeMap: { [key: string]: number }; // e.g., {"S": 10, "M": 5, "L": 3}
  unitPrice: number;
  sellingPrice: number;
  imageUrl?: string; // Optional field for product image URL
  isActive: boolean;
  canListed: boolean;
}

export interface Quantities {
  size?: string | number;
  sizes?: string[];
  [key: string]: string | number | string[] | undefined; // This allows dynamic keys to be added
}


export interface CustomerHome {
  products: Product[];
}