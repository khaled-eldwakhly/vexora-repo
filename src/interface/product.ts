import { Brand } from "./brands";
import { Category, Subcategory } from "./categories";

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ProductProps {
  productId: string;
  productTitle: string;
  productImageCover: string;
  productBrand: string;
  productCategory: string;
  productPrice: number;
  productRatingsQuantity: number;
  productRatingsAverage: number;
  isInWishlist?: boolean;
  reCallFun?: () => void;
}

export interface ProductId {
  productId: string;
}
