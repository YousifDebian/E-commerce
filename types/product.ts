export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;

  quantity: number;
  sold: number;

  price: number;
  priceAfterDiscount?: number;

  imageCover: string;
  images: string[];

  ratingsAverage: number;
  ratingsQuantity: number;

  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
}

export interface ProductsResponse {
  results: number;

  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };

  data: Product[];
}

export interface ProductResponse {
  data: Product;
}