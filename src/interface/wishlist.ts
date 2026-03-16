export interface WishlistItemProps {
  itemId: string;
  itemTitle: string;
  itemPrice: number;
  itemBrand: string;
  itemImageCover: string;
  wishlistIds: string[];
  reGetWishlist: () => Promise<void>;
}
