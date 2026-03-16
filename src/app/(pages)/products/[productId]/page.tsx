import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Product, ProductId } from "@/interface/product";
import { getSpecificProduct } from "@/actions/products.services";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddCartButton from "@/components/products/addToCartBtn";
import CarouselImg from "@/components/products/carousel";
import { Star } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default async function ProductDetails({
  params,
}: {
  params: ProductId;
}) {
  const { productId } = await params;
  const productDetails: Product = await getSpecificProduct(productId);

  return (
    <>
      <main className="pt-17">
        <title>{productDetails?.title}</title>
        <section className="flex justify-center items-center calc-h py-8">
          <div className="main-container">
            <Breadcrumb className="mb-6 *:text-lg md:*:text-2xl text-gray-500 font-medium ">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/" className="text-[20px]">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href="/products" className="text-[20px]">
                    Products
                  </Link>
                  <span>|</span>
                  <Link href="/categories" className="text-[20px]">
                    Categories
                  </Link>
                  <span>|</span>
                  <Link href="/brands" className="text-[20px]">
                    Brands
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-800">
                    Product Details
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Card className="gap-2 py-4 md:grid md:grid-cols-3 mt-7">
              <div className="col-span-1">
                <CarouselImg
                  imgs={productDetails.images}
                  title={productDetails.title}
                  imgCover={productDetails.imageCover}
                />
              </div>
              <div className="col-span-2 flex justi items-center">
                <div className="w-full space-y-7">
                  <CardHeader className="px-4">
                    <CardTitle className="font-bold my-2 text-xl">
                      <p>{productDetails.title}</p>
                    </CardTitle>
                    <CardDescription className="text-[#6A7282] bg-gray-100 w-fit px-2 py-0.5 rounded font-medium">
                      {productDetails.brand.name}
                    </CardDescription>
                    <CardDescription className="text-sm text-[#6A7282] bg-gray-100/50 w-fit px-2 py-0.5 rounded">
                      {productDetails.category.name}
                    </CardDescription>
                    <CardDescription className="text-black">
                      {productDetails.description}
                    </CardDescription>
                  </CardHeader>
                  <div>
                    <CardContent className="px-4">
                      <p className="font-semibold">
                        {productDetails.price} EGP
                      </p>
                    </CardContent>
                    <CardContent className="flex items-center px-4">
                      {[0, 1, 2, 3, 4].map((star, index) => {
                        const filledStar =
                          star < Math.round(productDetails.ratingsAverage);
                        return (
                          <React.Fragment key={index}>
                            <Star
                              className={`size-5 ${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`}
                            />
                          </React.Fragment>
                        );
                      })}
                      <p className="ml-1 text-[14px] text-[#6A7282]">
                        ({productDetails.ratingsQuantity})
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter className="flex px-4 mt-2 gap-2">
                    <AddCartButton productId={productId} />
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
