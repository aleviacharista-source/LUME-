export interface Shade {
  id: string;
  name: string;
  color: string;
  image?: string;
  modelColor?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Lips' | 'Face' | 'Eyes' | 'Skincare';
  subCategory?: string;
  price: number;
  description: string;
  longDescription?: string;
  details: string[];
  ingredients: string;
  howToUse: string;
  images: string[];
  secondaryImage?: string;
  shades: Shade[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  stock: number;
  finish?: 'Matte' | 'Glossy' | 'Natural';
  shadeFamily?: 'Nude' | 'Pink' | 'Red' | 'Brown';
  productModel?: 'serum' | 'lipstick' | 'foundation' | 'compact' | 'cream';
  reviews?: Review[];
}

export interface CartItem {
  id: string; // product.id + '-' + shade.id
  product: Product;
  selectedShade: Shade;
  quantity: number;
}

export interface FilterState {
  category: string[];
  priceRange: string[];
  finish: string[];
  shade: string[];
  sortBy: 'recommended' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface OrderInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'bank_transfer' | 'e_wallet' | 'card';
}

export interface OrderConfirmation extends OrderInfo {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  date: string;
}
