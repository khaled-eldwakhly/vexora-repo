"use server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllProducts() {
  const response = await fetch(`${API_URL}products`, {
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export async function getSpecificProduct(id: string) {
  const response = await fetch(`${API_URL}products/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}

export async function getCategoryProducts(categoryId: string) {
  const response = await fetch(`${API_URL}products?category[in]=${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}

export async function getBrandProducts(brandId: string) {
  const response = await fetch(`${API_URL}products?brand=${brandId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}
