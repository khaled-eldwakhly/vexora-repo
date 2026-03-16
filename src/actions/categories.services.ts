"use server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getAllCategories() {
  const response = await fetch(`${API_URL}categories`, {
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

export async function getSpecificCategory(categoryId: string) {
  const response = await fetch(`${API_URL}categories/${categoryId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}

export async function getAllSubCategoriesOnCategory(categoryId: string) {
  const response = await fetch(
    `${API_URL}categories/${categoryId}/subcategories`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}
