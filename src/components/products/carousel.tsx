"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type CarouselProps = {
  imgCover: string;
  imgs: string[];
  title: string;
};

export default function CarouselImg({ imgs, title, imgCover }: CarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="h-60 md:w-full md:h-110 relative">
            <Image
              fill
              alt={title}
              src={imgCover}
              className="mx-auto object-contain"
            />
          </div>
        </CarouselItem>
        {imgs.map((img) => (
          <CarouselItem key={img}>
            <div className="h-60 md:w-full md:h-110 relative">
              <Image
                fill
                alt={title}
                src={img}
                className="mx-auto object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
