"use server";

import { getUserToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getLoggedUserWishlist() {
  const token = await getUserToken();
  if (!token) {
    return;
  }
  const response = await fetch(`${API_URL}wishlist`, {
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}

export async function addProductToWishlist(productId: string) {
  const token = await getUserToken();
  const response = await fetch(`${API_URL}wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function removeProductFromWishlist(productId: string) {
  const token = await getUserToken();
  const response = await fetch(`${API_URL}wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}
