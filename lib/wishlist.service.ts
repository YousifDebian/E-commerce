import type {
  WishlistActionResponse,
  WishlistResponse,
} from "@/types/wishlist";

const API_URL = "https://ecommerce.routemisr.com/api/v1";

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

export async function getWishlist(): Promise<WishlistResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${API_URL}/wishlist`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const data: WishlistResponse | { message?: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Failed to get wishlist"
    );
  }

  return data as WishlistResponse;
}

export async function addToWishlist(
  productId: string
): Promise<WishlistActionResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${API_URL}/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data: WishlistActionResponse | { message?: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Failed to add product to wishlist"
    );
  }

  return data as WishlistActionResponse;
}

export async function removeFromWishlist(
  productId: string
): Promise<WishlistActionResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(
    `${API_URL}/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  const data: WishlistActionResponse | { message?: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Failed to remove product from wishlist"
    );
  }

  return data as WishlistActionResponse;
}