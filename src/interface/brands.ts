export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandId {
  brandId: string;
}

export interface BrandProps {
  brandId: string;
  brandImage: string;
  brandName: string;
}
