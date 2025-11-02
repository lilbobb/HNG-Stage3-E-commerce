import { Doc, Id } from "convex/_generated/dataModel";

export type ProductDoc = Doc<'products'>;

export interface Product {
  _id: string;
  _creationTime?: number;
  slug: string;
  name: string;
  category: 'headphones' | 'speakers' | 'earphones';
  price: number;
  description: string;
  features: string;
  categoryImage: {
    desktop: string;  
    mobile: string;
    tablet: string;
  };
  isNew: boolean; 
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: {
      desktop: string; 
      mobile: string;
      tablet: string;
    };
    second: {
      desktop: string;
      mobile: string;
      tablet: string;
    };
    third: {
      desktop: string;
      mobile: string;
      tablet: string;
    };
  };
  others: string[];
}

export function toProduct(doc: ProductDoc): Product {
  return doc as Product;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 'e-money' | 'cash';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  zip: string; 
  country: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  taxes: number;
  grandTotal: number;
}

export interface Order {
  id: string;
  orderNumber?: string; 
  items: OrderItem[];
  totals: OrderTotals;
  customer: CustomerInfo; 
  shipping: ShippingInfo; 
  status: OrderStatus;
  createdAt: number;
  paymentMethod?: PaymentMethod; 
}

export type OrderDoc = Doc<'orders'>;

export function toOrder(doc: OrderDoc): Order {
  return {
    id: doc._id,
    orderNumber: (doc as any).orderNumber || `ORD-${doc._id}`, 
    items: doc.items || [],
    totals: doc.totals || {
      subtotal: 0,
      shipping: 0,
      taxes: 0,
      grandTotal: 0
    },
    customer: doc.customer || {
      name: '',
      email: '',
      phone: ''
    },
    shipping: doc.shipping || {
      address: '',
      city: '',
      zip: '',
      country: ''
    },
    status: (doc.status as OrderStatus) || 'confirmed',
    createdAt: doc.createdAt,
    paymentMethod: (doc as any).paymentMethod as PaymentMethod,
  };
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  grandTotal: number;
  itemCount: number;
  createdAt: number;
  customerName: string;
}

export interface CreateOrderData {
  orderNumber: string;
  items: OrderItem[];
  totals: OrderTotals;
  customer: CustomerInfo;
  shipping: ShippingInfo;
  paymentMethod: PaymentMethod;
  status?: OrderStatus;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  notes?: string;
}

export function generateOrderNumber(): string {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

export function calculateOrderTotals(items: CartItem[]): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const taxes = Math.floor(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  return { subtotal, shipping, taxes, grandTotal };
}

export function isValidOrder(order: any): order is Order {
  return (
    order &&
    typeof order.id === 'string' &&
    Array.isArray(order.items) &&
    order.totals &&
    typeof order.totals.grandTotal === 'number' &&
    order.customer &&
    typeof order.customer.email === 'string'
  );
}

export interface ExtendedOrderItem extends OrderItem {
  image?: string;
  slug?: string;
}

export interface ExtendedOrder extends Omit<Order, 'items'> {
  items: ExtendedOrderItem[];
  customerInfo?: CustomerInfo; 
  shippingInfo?: ShippingInfo; 
}