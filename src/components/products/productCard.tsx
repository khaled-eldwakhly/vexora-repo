import { ProductProps } from "@/interface/product";

import AddCartButton from "@/components/products/addToCartBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import WishlistBtn from "./wishlistBtn";

export default function ProductCard({
  productId,
  productTitle,
  productImageCover,
  productBrand,
  productCategory,
  productPrice,
  productRatingsQuantity,
  productRatingsAverage,
  isInWishlist,
  reCallFun,
}: ProductProps) {
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
        <Card className="gap-2 py-4 hover:scale-103 duration-300 hover:shadow-lg overflow-hidden">
          <Link href={`/products/${productId}`}>
            <div className="relative w-60 h-60 mx-auto">
              <Image
                fill
                sizes="(max-width: 768px) 50vw,
         (max-width: 1200px) 33vw,
         25vw"
                alt={productTitle}
                src={productImageCover}
                className="object-contain"
              />
            </div>
            <CardHeader className="px-4">
              <CardDescription className="text-[#6A7282] bg-gray-100 w-fit mt-3 px-2 py-0.5 rounded">
                {productBrand}
              </CardDescription>
              <CardTitle className="font-bold">
                <p className="line-clamp-1">{productTitle}</p>
              </CardTitle>
              <CardDescription className="text-sm">
                {productCategory}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center px-4">
              {[0, 1, 2, 3, 4].map((star, index) => {
                const filledStar = star < Math.round(productRatingsAverage);
                return (
                  <React.Fragment key={index}>
                    <Star
                      className={`size-5 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`}
                    />
                  </React.Fragment>
                );
              })}
              <p className="ml-1 text-[14px] text-[#6A7282]">
                ({productRatingsQuantity})
              </p>
            </CardContent>
            <CardContent className="px-4">
              <p className="font-semibold">{productPrice} EGP</p>
            </CardContent>
          </Link>
          <CardFooter className="flex px-4 mt-2 gap-1">
            <AddCartButton productId={productId} />
            <WishlistBtn
              productId={productId}
              isInWishlist={isInWishlist!}
              reCallFun={reCallFun!}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
