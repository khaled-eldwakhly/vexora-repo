"use server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllBrands() {
  const response = await fetch(`${API_URL}brands`, {
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

export async function getSpecificBrand(brandId: string) {
  const response = await fetch(`${API_URL}brands/${brandId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}
