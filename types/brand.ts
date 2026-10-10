export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Brand[];
}

export interface BrandResponse {
  data: Brand;
}