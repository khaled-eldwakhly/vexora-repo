"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/actions/cart.action";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import { redirect } from "next/navigation";

export default function AddCartButton({ productId }: { productId: string }) {
  const { handleQuantity } = useContext(cartQuantityContext);
  const [isLoading, setIsLoading] = useState(false);
  async function addProductToCart(productId: string) {
    try {
      setIsLoading(true);
      const response = await addToCart(productId);
      if (response.status === "success") {
        toast.success("Product added to your cart", { position: "top-right" });
        handleQuantity();
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-right" });
      redirect("/signin");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        className="grow text-[14px] py-2 px-3 border-2 border-black rounded-xl cursor-pointer"
        disabled={isLoading}
        onClick={() => {
          addProductToCart(productId);
        }}
      >
        {isLoading ? (
          <Spinner className="size-6" />
        ) : (
          <>
            <ShoppingCart className="size-6" />
            <span>Add To Cart</span>
          </>
        )}
      </Button>
    </>
  );
}
