import { Mail, MapPinHouse, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section>
        <hr />
        <div className="container mx-auto 2xl:max-w-6xl 2xl:py-12 px-3.5 py-10">
          <div className="*:p-3 grid grid-cols-12 *:col-span-12 gap-4 *:sm:col-span-6 *:md:col-span-4 *:lg:col-span-3 xl:flex *:border *:rounded *:bg-gray-50">
            <div className="text-[#4A5565] text-[14px] font-normal space-y-3 flex-3">
              <div>
                <Link href="/" className="flex items-center gap-2 w-fit">
                  <div className="w-8">
                    <img src="/vlogo.png" alt="" />
                  </div>
                  <span className="font-bold text-xl">Vexora</span>
                </Link>
              </div>
              <div>
                <p>
                  Your one-stop destination for the latest technology, fashion,
                  and lifestyle products. Quality guaranteed with fast shipping
                  and excellent customer service.
                </p>
              </div>
              <div>
                <ul className="2xl:space-y-3 space-y-3">
                  <li className="flex gap-1.5">
                    <MapPinHouse />
                    <span>123 Shop Street, Octoper City, DC 12345</span>
                  </li>
                  <li className="flex gap-1.5">
                    <Phone />
                    <span>(+20) 01553678741</span>
                  </li>
                  <li className="flex gap-1.5">
                    <Mail />
                    <span>keldwakhly@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-2 space-y-3">
              <h3 className="font-bold">SHOP</h3>
              <ul className="text-[#4A5565] 2xl:space-y-3 space-y-1.5">
                <li>Electronics</li>
                <li>Fashion</li>
                <li>Home & Garden</li>
                <li>Sports</li>
                <li>Deals</li>
              </ul>
            </div>
            <div className="flex-2 space-y-3">
              <h3 className="font-bold">CUSTOMER SERVICE</h3>
              <ul className="text-[#4A5565] 2xl:space-y-3 space-y-1.5">
                <li>Contact Us</li>
                <li>Help Center</li>
                <li>Track Your Order </li>
                <li>Returns & Exchanges</li>
                <li>Size Guide</li>
              </ul>
            </div>
            <div className="flex-2 space-y-3">
              <h3 className="font-bold">ABOUT</h3>
              <ul className="text-[#4A5565] 2xl:space-y-3 space-y-1.5">
                <li>About shopmart</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Investor Relations</li>
                <li>Sustainability</li>
              </ul>
            </div>
            <div className="flex-2 space-y-3">
              <h3 className="font-bold">POLICIES</h3>
              <ul className="text-[#4A5565] 2xl:space-y-3 space-y-1.5">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Shipping Policy</li>
                <li>Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
