import { Doc, Id } from '.convex/_generated/dataModel';

// Base product type from Convex schema
export type ProductDoc = Doc<'products'>;

// Frontend-friendly product type (transformed from Convex)
export interface Product {
  id: string; // Converted from Doc._id
  slug: string;
  name: string;
  category: 'headphones' | 'speakers' | 'earphones';
  price: number;
  description: string;
  features: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    second: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    third: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  others: Array<{
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }>;
  createdAt?: number; // From Convex _creationTime
}

// Helper to transform Convex doc to frontend Product
export function toProduct(doc: ProductDoc): Product {
  return {
    ...doc,
    id: doc._id,
    createdAt: doc._creationTime,
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  grandTotal: number;
  vat: number;
  shipping: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
  };
  paymentMethod: 'e-money' | 'cash';
  createdAt: number;
}