import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { CartProduct } from "@/interface/cart";
import {
  deleteProductCart,
  updateProductCartCount,
} from "@/actions/cart.action";
import { toast } from "sonner";
import { useContext, useState } from "react";
import { Spinner } from "../ui/spinner";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import Link from "next/link";

export default function CartItem({
  productDetails,
  resetProductsFun,
  resetNumberOfItems,
  reCallCartFun,
}: {
  productDetails: CartProduct;
  resetProductsFun: (products: CartProduct[]) => void;
  resetNumberOfItems: (cartItemCounter: number) => void;
  reCallCartFun: () => void;
}) {
  const { handleQuantity } = useContext(cartQuantityContext);
  const [isLoading, setIsLoading] = useState(false);
  const [quantityLoading, setQuantityLoading] = useState(false);
  async function deleteCartItem(productId: string) {
    try {
      setIsLoading(true);
      const data = await deleteProductCart(productId);
      if (data.status === "success") {
        toast.success("Product removed from your cart", {
          position: "top-right",
        });
        resetProductsFun(data.data.products);
        resetNumberOfItems(data.numOfCartItems);
        handleQuantity();
        reCallCartFun();
      }
    } catch (error) {
      toast.error("Error Occurred!", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateQuantity(productId: string, newCount: number) {
    try {
      setQuantityLoading(true);
      const data = await updateProductCartCount(productId, newCount);
      if (data.status === "success") {
        resetProductsFun(data.data.products);
        handleQuantity();
        reCallCartFun();
      }
    } catch (error) {
    } finally {
      setQuantityLoading(false);
    }
  }
  return (
    <>
      <div className="col-span-10 sm:col-span-5 lg:col-span-10 md:flex md:justify-between border-2 rounded-lg p-4 shadow-sm">
        <div className="md:flex">
          <Link href={`/products/${productDetails.id}`}>
            <div className="size-50 mx-auto md:size-32 relative">
              <Image
                src={productDetails.product.imageCover}
                fill
                alt={productDetails.product.title}
                className="object-contain"
              />
            </div>
          </Link>
          <div className="md:flex md:flex-col md:justify-between pt-4 space-y-2">
            <h2 className="font-bold line-clamp-1">
              {productDetails.product.title}
            </h2>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-[#6A7282] bg-gray-100 w-fit mt-3 px-2 py-0.5 rounded">
                {productDetails.product.brand.name}
              </p>
              <p className="text-sm text-[#6A7282] bg-gray-100/50 w-fit mt-3 px-2 py-0.5 rounded">
                {productDetails.product.category.name}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                disabled={quantityLoading || isLoading}
                className="bg-white text-black cursor-pointer border-2 active:bg-gray-200 hover:bg-gray-100 hover:text-black"
                onClick={() => {
                  updateQuantity(
                    productDetails.product._id,
                    productDetails.count - 1,
                  );
                }}
              >
                <Minus />
              </Button>
              {quantityLoading ? (
                <Spinner />
              ) : (
                <span>{productDetails.count}</span>
              )}

              <Button
                disabled={quantityLoading || isLoading}
                className="bg-white text-black cursor-pointer border-2 active:bg-gray-200 hover:bg-gray-100 hover:text-black"
                onClick={() => {
                  updateQuantity(
                    productDetails.product._id,
                    productDetails.count + 1,
                  );
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="md:flex flex-col hidden">
            <span className="font-bold">
              {productDetails.price * productDetails.count} EGP
            </span>
            <span className="text-gray-600 text-sm font-medium">
              {productDetails.price} × {productDetails.count}
            </span>
          </div>
          <Button
            disabled={quantityLoading || isLoading}
            className="text-red-700 border-b-2 hover:[&_span]:border-red-700 hover:[&_span]:border-b-2 hover:bg-white cursor-pointer border-0 bg-gray-100 mt-3 rounded-lg"
            onClick={() => {
              deleteCartItem(productDetails.product._id);
            }}
          >
            {isLoading ? <Spinner /> : <span>Remove</span>}
          </Button>
        </div>
      </div>
    </>
  );
}
