export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryId {
  categoryId: string;
}

export interface CategoryProps {
  categoryId: string;
  categoryImage: string;
  categoryName: string;
}

