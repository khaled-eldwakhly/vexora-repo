import ProductCard from "@/components/products/productCard";
import { BrandId } from "@/interface/brands";
import { Product } from "@/interface/product";
import { getBrandProducts } from "@/actions/products.services";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSpecificBrand } from "@/actions/brands.services";

export default async function BrandDetails({
  params,
}: {
  params: Promise<BrandId>;
}) {
  const { brandId } = await params;
  const brandProducts: Product[] = await getBrandProducts(brandId);
  const brandDetails = await getSpecificBrand(brandId);

  if (brandProducts.length === 0) {
    return (
      <>
        <main className="py-17">
          <section className="main-container calc-h py-8">
            <Breadcrumb className="mb-6 *:text-2xl text-gray-500 font-medium ">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href="/brands">Brands</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-800">
                    {brandDetails.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div>
              <div className="flex justify-center items-center">
                <h2 className="w-full text-red-600 font-semibold text-xl">
                  Sorry, there are no products in this brand yet.
                  <span className="ml-2 text-green-500 hover:border-b-2 hover:border-green-500 pb-0.5">
                    <Link href={"/brands"}>Try exploring other brands!</Link>
                  </span>
                </h2>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="pt-17">
        <section className="main-container calc-h py-8">
          <Breadcrumb className="mb-6 *:text-2xl text-gray-500 font-medium ">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/" className="text-[20px]">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href="/brands" className="text-[20px]">
                  Brands
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                  {brandDetails.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-12 gap-6">
            {brandProducts.map((brand) => (
              <React.Fragment key={brand._id}>
                <ProductCard
                  productId={brand._id}
                  productImageCover={brand.imageCover}
                  productTitle={brand.title}
                  productBrand={brand.brand.name}
                  productCategory={brand.category.name}
                  productRatingsAverage={brand.ratingsAverage}
                  productRatingsQuantity={brand.ratingsQuantity}
                  productPrice={brand.price}
                />
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
