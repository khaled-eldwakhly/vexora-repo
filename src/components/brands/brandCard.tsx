import { BrandProps } from "@/interface/brands";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BrandCard({
  brandId,
  brandImage,
  brandName,
}: BrandProps) {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 border-2 rounded-lg shadow-sm overflow-hidden relative group hover:scale-105 transition-transform duration-300">
      <Link href={`/brands/${brandId}`}>
        <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 group-hover:blur-[2px] transition duration-300">
          <Image
            src={brandImage}
            fill
            alt={brandName}
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 text-white font-medium flex items-center justify-center w-full h-full">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">Shop with {brandName}</span>
              <ChevronRight />
            </div>
          </div>
        </div>

        <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold py-4 relative z-10 group-hover:text-white">
          {brandName}
        </h2>
      </Link>
    </div>
  );
}
