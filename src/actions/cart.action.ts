"use server";

import { getUserToken } from "@/lib/auth";

export async function addToCart(productId: string) {
  const token = await getUserToken();
  if (!token) {
    throw new Error("You must be Logged in!");
  }
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function getLoggedUserCart() {
  const token = await getUserToken();
  if (!token) {
    return;
  }
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function deleteProductCart(productId: string) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
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

export async function updateProductCartCount(
  productId: string,
  newCount: number,
) {
  const token = await getUserToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: newCount }),
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

export async function clearUserCart() {
  const token = await getUserToken();
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}
