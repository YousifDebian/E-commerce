export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  ratingsAverage?: number;
}

export interface OrderItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderData {
  _id: string;
  user: OrderUser;
  cartItems: OrderItem[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress?: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id?: number;
  __v?: number;
}

export interface CreateOrderResponse {
  status: string;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  pricing: {
    cartPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
  };
  data: OrderData;
}