import type { BrandResponse, BrandsResponse } from "@/types/brand";

const API_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com")
  .replace(/\/+$/, "");
const API_BASE = API_URL.endsWith("/api/v1") ? API_URL : `${API_URL}/api/v1`;

export async function getBrands(): Promise<BrandsResponse> {
  const response = await fetch(`${API_BASE}/brands`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  return response.json();
}

export async function getBrandById(
  id: string
): Promise<BrandResponse> {
  const response = await fetch(`${API_BASE}/brands/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch brand");
  }

  return response.json();
}