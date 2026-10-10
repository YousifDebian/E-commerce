import type { Category } from "@/types/category";

const API_URL = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://ecommerce.routemisr.com")
  .replace(/\/+$/, "");
const API_BASE = API_URL.endsWith("/api/v1") ? API_URL : `${API_URL}/api/v1`;

export async function getCategories(): Promise<{
  data: Category[];
}> {
  const response = await fetch(`${API_BASE}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getCategoryById(
  id: string
): Promise<{
  data: Category;
}> {
  const response = await fetch(`${API_BASE}/categories/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}