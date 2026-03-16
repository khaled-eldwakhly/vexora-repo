import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="md:pt-17">
        <section>
          <div className="2xl:max-w-6xl mx-auto flex justify-center items-center calc-h">
            <div className="text-center space-y-4 2xl:space-y-7">
              <h2 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold">
                Welcome to Vexora
              </h2>
              <p className="text-[14px] sm:text-[17px] lg:text-2xl text-[#4A5565] font-medium md:max-w-7/10 mx-auto">
                Discover the latest technology, fashon, and lifestyle products.
                Quality guarnteed with fast shipping and excellent customer
                servise.
              </p>
              <div className="space-x-4">
                <Button
                  asChild
                  className="2xl:text-lg py-4.5 px-6 border-2 border-black"
                >
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black border-2 border-black hover:text-white hover:bg-black duration-300 2xl:text-lg py-4.5 px-6"
                >
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
