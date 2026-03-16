import BrandCard from "@/components/brands/brandCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Brand } from "@/interface/brands";
import { getAllBrands } from "@/actions/brands.services";
import Link from "next/link";

export default async function Brands() {
  const brands: Brand[] = await getAllBrands();
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
                <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                  Brands
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-12 gap-6 mx-auto">
            {brands?.map((brand) => (
              <BrandCard
                key={brand._id}
                brandId={brand._id}
                brandName={brand.name}
                brandImage={brand.image}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
