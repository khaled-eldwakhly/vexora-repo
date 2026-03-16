import CategoryCard from "@/components/categories/categoryCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Category } from "@/interface/categories";
import { getAllCategories } from "@/actions/categories.services";
import Link from "next/link";

export default async function Categories() {
  const data = await getAllCategories();
  const categories: Category[] = data;

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
                <BreadcrumbPage className="font-semibold text-gray-800 text-[20px]">
                  Categories
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-12 gap-6">
            {categories?.map((category) => (
              <CategoryCard
                key={category._id}
                categoryId={category._id}
                categoryImage={category.image}
                categoryName={category.name}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
