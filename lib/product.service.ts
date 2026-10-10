import type { ProductResponse, ProductsResponse } from "@/types/product";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(
  id: string
): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getProductsByCategory(
  categoryId: string
): Promise<ProductsResponse> {
  const params = new URLSearchParams();

  params.set("category[in]", categoryId);

  const response = await fetch(
    `${API_URL}/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
}

export async function getProductsByBrand(
  brandId: string
): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/products?brand=${brandId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch brand products");
  }

  return response.json();
}