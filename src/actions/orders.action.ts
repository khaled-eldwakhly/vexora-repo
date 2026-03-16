"use server";

import { ShippingAddressI } from "@/interface/orders";
import { getUserId, getUserToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddressI,
) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You must be Logged in!");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function checkoutSession(
  cartId: string,
  shippingAddress: ShippingAddressI,
) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You must be Logged in!");
  }
  const response = await fetch(
    `${API_URL}orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function getUserOrders() {
  const userId = await getUserId();
  const response = await fetch(`${API_URL}orders/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}
