import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

export default function Loading() {
  return (
    <>
      <section className="calc-h flex justify-center items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="size-15 relative">
              <Image src="/vlogo.png" fill alt="vexora logo" />
            </div>
            <h2 className="text-xl font-bold">VEXORA</h2>
          </div>
          <Spinner className="size-10 mx-auto mt-1.5" />
        </div>
      </section>
    </>
  );
}
