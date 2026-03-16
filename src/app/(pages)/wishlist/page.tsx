"use client";

import { getLoggedUserWishlist } from "@/actions/wishlist.action";
import ClientLoader from "@/components/common/clientLoader";
import ProductCard from "@/components/products/productCard";
import { Product } from "@/interface/product";
import { Heart, Smile } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [isFetching, setIsFetching] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  async function getWishlistItems() {
    try {
      const data: Product[] = await getLoggedUserWishlist();
      setWishlistProducts(data);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    getWishlistItems();
  }, []);

  if (isFetching)
    return (
      <main className="pt-17">
        <ClientLoader />
      </main>
    );
  if (!wishlistProducts || wishlistProducts.length === 0)
    return (
      <main className="pt-17">
        <section className="calc-h flex justify-center items-center">
          <div className="-translate-y-1/2 text-center space-y-4">
            <h3 className="text-gray-900 text-3xl font-bold">
              Your Wishlist is Empty!
            </h3>
            <p className="text-xl font-semibold space-x-2">
              <Link
                href={"/products"}
                className="border-b-2 border-gray-600 text-gray-600 md:hover:text-black md:duration-150 md:transition-colors md:border-b-2 md:border-transparent md:hover:border-black md:pb-1"
              >
                Explore Our Featured Products
              </Link>
              <span className="text-gray-500">
                <br />
                and add them to your{" "}
                <span className="text-red-500">Wishlist</span>{" "}
                <Smile className="inline-block text-red-500" />
              </span>
            </p>
          </div>
        </section>
      </main>
    );

  return (
    <>
      <main className="pt-17">
        <section className="main-container calc-h py-8 space-y-7">
          <h2 className="text-[20px] md:text-2xl font-bold flex items-center gap-1.5">
            My Wishlist <Heart className="fill-red-500 text-red-500" />
          </h2>
          <div className="grid grid-cols-12 gap-7">
            {wishlistProducts.map((wishProduct) => (
              <ProductCard
                key={wishProduct._id}
                productId={wishProduct._id}
                productTitle={wishProduct.title}
                productImageCover={wishProduct.imageCover}
                productBrand={wishProduct.brand.name}
                productCategory={wishProduct.category.name}
                productPrice={wishProduct.price}
                productRatingsQuantity={wishProduct.ratingsQuantity}
                productRatingsAverage={wishProduct.ratingsAverage}
                isInWishlist={wishlistProducts.some(
                  (p) => p._id === wishProduct._id,
                )}
                reCallFun={getWishlistItems}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
