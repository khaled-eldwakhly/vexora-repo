import ProductCard from "@/components/products/productCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CategoryId } from "@/interface/categories";
import { Product } from "@/interface/product";
import { getSpecificCategory } from "@/actions/categories.services";
import { getCategoryProducts } from "@/actions/products.services";
import Link from "next/link";
import React from "react";

export default async function CategoryDetails({
  params,
}: {
  params: Promise<CategoryId>;
}) {
  const { categoryId } = await params;
  const categoryDetails = await getSpecificCategory(categoryId);
  const categoryProducts: Product[] = await getCategoryProducts(categoryId);

  if (categoryProducts.length === 0) {
    return (
      <>
        <main className="pt-17">
          <section className="main-container calc-h py-8">
            <Breadcrumb className="mb-6 *:text-2xl text-gray-500 font-medium">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/" className="text-[20px]">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Link href="/categories" className="text-[20px]">
                    Categories
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                    {categoryDetails.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div>
              <div className="flex justify-center items-center">
                <h2 className="w-full text-red-600 font-semibold text-[17px] md:text-xl">
                  Sorry, there are no products in this category yet.
                  <span className="ml-2 text-green-500 hover:border-b-2 hover:border-green-500 pb-0.5">
                    <Link href={"/categories"}>
                      Try exploring other categories!
                    </Link>
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
                <Link href="/categories" className="text-[20px]">
                  Categories
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                  {categoryDetails.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-12 gap-6">
            {categoryProducts.map((product) => (
              <React.Fragment key={product._id}>
                <ProductCard
                  productId={product._id}
                  productImageCover={product.imageCover}
                  productTitle={product.title}
                  productBrand={product.brand.name}
                  productCategory={product.category.name}
                  productRatingsAverage={product.ratingsAverage}
                  productRatingsQuantity={product.ratingsQuantity}
                  productPrice={product.price}
                />
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
