import type {
  CreateOrderResponse,
  ShippingAddress,
} from "@/types/order";

const API_URL = "https://ecommerce.routemisr.com/api";

function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
): Promise<CreateOrderResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("You must be logged in");
  }

  const response = await fetch(
    `${API_URL}/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );

  const data: CreateOrderResponse | { message?: string } =
    await response.json();

  if (!response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Failed to create order"
    );
  }

  return data as CreateOrderResponse;
}