import { CategoryProps } from "@/interface/categories";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  categoryId,
  categoryImage,
  categoryName,
}: CategoryProps) {
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border-2 rounded-lg shadow-sm overflow-hidden h-72 md:h-80 hover:scale-103 duration-300">
        <Link href={`/categories/${categoryId}`}>
          <div className="md:w-full h-full relative group flex flex-col">
            <div className="relative w-full h-full group">
              <Image
                src={categoryImage}
                fill
                className="object-contain md:object-cover group-hover:blur-xs duration-500"
                alt={categoryName}
              />
            </div>
            <div className="absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/25 text-white font-medium flex items-center justify-center w-full h-full">
                <div className="flex items-center">
                  <span className="text-xl">Explore Now</span>
                  <ChevronRight />
                </div>
              </div>
            </div>
            <div className="px-3 py-1 font-semibold text-gray-800 text-lg">
              <h3>{categoryName}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
