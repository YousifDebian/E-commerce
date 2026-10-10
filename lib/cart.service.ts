import type { CartResponse } from "@/types/cart";

const API_URL = "https://ecommerce.routemisr.com/api";

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

export async function addToCart(
  productId: string
): Promise<CartResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${API_URL}/v2/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
}

export async function getCart(): Promise<CartResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${API_URL}/v2/cart`, {
    method: "GET",
    headers: {
      token: token,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get cart");
  }

  return data;
}

export async function updateCartQuantity(
  productId: string,
  count: number
): Promise<CartResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(
    `${API_URL}/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        count: count,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update cart quantity"
    );
  }

  return data;
}

export async function removeFromCart(
  productId: string
): Promise<CartResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(
    `${API_URL}/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to remove product from cart"
    );
  }

  return data;
}

export async function clearCart(): Promise<CartResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(`${API_URL}/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to clear cart");
  }

  return data;
}