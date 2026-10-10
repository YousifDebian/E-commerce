export interface CartProduct {
  count: number;
  _id: string;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    category: {
      _id: string;
      name: string;
      slug: string;
      image?: string;
    };
  };
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: Cart;
}