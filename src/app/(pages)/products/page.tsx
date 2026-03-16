import { getAllProducts } from "@/actions/products.services";
import { Product } from "@/interface/product";

import ProductCard from "@/components/products/productCard";
import Link from "next/link";

import { getLoggedUserWishlist } from "@/actions/wishlist.action";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function Products() {
  const wishlistItems: Product[] = await getLoggedUserWishlist();
  const { data } = await getAllProducts();
  const products: Product[] = data;

  return (
    <>
      <main className="pt-17">
        <section className="calc-h">
          <div className="main-container py-8">
            <Breadcrumb className="mb-6 *:text-2xl text-gray-500 font-medium ">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href="/" className="text-[20px]">
                    Home
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                    Products
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-12 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  productImageCover={product.imageCover}
                  productTitle={product.title}
                  productBrand={product.brand.name}
                  productCategory={product.category.name}
                  productRatingsAverage={product.ratingsAverage}
                  productRatingsQuantity={product.ratingsQuantity}
                  productPrice={product.price}
                  isInWishlist={wishlistItems?.some(
                    (p) => p._id === product._id,
                  )}
                  reCallFun={getLoggedUserWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
