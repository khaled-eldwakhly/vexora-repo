"use client";

import { clearUserCart, getLoggedUserCart } from "@/actions/cart.action";
import CartItem from "@/components/cart/cartItem";
import ClientLoader from "@/components/common/clientLoader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CartData, CartI, CartProduct } from "@/interface/cart";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import { ShoppingCart, Smile, Trash } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function Cart() {
  const { numOfCartItems, handleQuantity } = useContext(cartQuantityContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<CartProduct[] | []>([]);
  const [numberOfItems, setNumberOfItems] = useState<number | null>(null);
  const [cart, setCart] = useState<CartI | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);
  async function getUserCart() {
    const data: CartI = await getLoggedUserCart();
    setCart(data);
    setCartData(data.data);
    setNumberOfItems(data.numOfCartItems);
    setProducts(data.data.products);
  }
  useEffect(() => {
    getUserCart();
  }, []);

  async function clearCart() {
    try {
      setIsLoading(true);
      const data = await clearUserCart();
      if (data.status === "success") {
        setProducts([]);
        setNumberOfItems(0);
        toast.success("Your Cart is Cleared!", { position: "top-right" });
        handleQuantity();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  // * Clear Cart Alert
  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your cart will be emptied completely",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Clear",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  };

  return (
    <>
      <main className="pt-17">
        {numberOfItems === null ? (
          <div className="pt-17">
            <ClientLoader />
          </div>
        ) : numberOfItems <= 0 ? (
          <>
            <section className="calc-h flex justify-center items-center">
              <div className="-translate-y-1/2 text-center space-y-4">
                <h3 className="text-gray-900 text-3xl font-bold">
                  Yor Cart is Empty!
                </h3>
                <p className="text-xl font-semibold space-x-2">
                  <Link
                    href={"/products"}
                    className="border-b-2 border-gray-600 text-gray-600 md:hover:text-black md:duration-150 md:transition-colors md:border-b-2 md:border-transparent md:hover:border-black md:pb-1"
                  >
                    Explore Our Featured Products
                  </Link>
                  <span className="text-gray-500">
                    <br />
                    and add them to your{" "}
                    <span className="text-green-500">Cart</span>{" "}
                    <Smile className="inline-block text-green-500" />
                  </span>
                </p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="main-container min-h-screen py-8 space-y-7">
              <div className="space-y-1">
                <h3 className="text-[20px] md:text-2xl font-bold flex items-center gap-1.5">
                  Shopping Cart <ShoppingCart className="text-green-500" />
                </h3>
                <p className="text-gray-700 text-[14px] font-medium">
                  {numberOfItems} Products in your cart
                </p>
              </div>
              <div className="lg:flex lg:items-start gap-3">
                {/* products */}
                <div className="grid grid-cols-10 gap-5 lg:w-2/3">
                  {/* one product */}
                  {products.map((product) => (
                    <CartItem
                      key={product.id}
                      productDetails={product}
                      resetProductsFun={setProducts}
                      resetNumberOfItems={setNumberOfItems}
                      reCallCartFun={getUserCart}
                    />
                  ))}
                </div>
                {/* order summary */}
                <div className="mt-6 border-2 border-gray-500 rounded-lg p-4 shadow-sm relative lg:mt-0 lg:grow">
                  <h2 className="font-bold mb-2">Order Summary</h2>
                  <div className="space-y-1">
                    <p className="flex justify-between">
                      <span className="text-gray-500 font-medium">
                        Subtotal: {numOfCartItems}
                      </span>
                      <span className="font-bold">
                        {cartData?.totalCartPrice} EGP
                      </span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500 font-medium">
                        Shipping
                      </span>
                      <span className="text-emerald-500 font-bold">Free</span>
                    </p>
                  </div>
                  <hr className="my-3" />
                  <p className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>3400 EGP</span>
                  </p>
                  <div className="space-y-1.5 mt-3">
                    <Button className="w-full font-semibold cursor-pointer">
                      <Link href={`/checkout/${cart?.cartId}`}>
                        Proceed to Checkout
                      </Link>
                    </Button>
                    <Button className="w-full font-semibold cursor-pointer">
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                  <Button
                    disabled={isLoading}
                    className="ml-auto flex items-center -mt-5 bg-white text-red-700 border-2 hover:text-red-700 active:bg-gray-200 cursor-pointer hover:bg-gray-100 absolute -bottom-13 right-0"
                    onClick={confirmDelete}
                  >
                    <Trash />
                    {isLoading ? <Spinner /> : <span>Clear Cart</span>}
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
