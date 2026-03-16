"use client";

import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/actions/wishlist.action";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export default function WishlistButton({
  productId,
  isInWishlist,
  reCallFun,
}: {
  productId: string;
  isInWishlist: boolean;
  reCallFun: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[] | string>([]);

  useEffect(() => {
    if (isInWishlist) {
      setWishlistIds(productId);
    }
  }, []);
  async function addToWishlist() {
    try {
      setIsLoading(true);
      const data = await addProductToWishlist(productId);
      if (data.status === "success") {
        setWishlistIds(data.data);
        toast.success("Product added to your wishlist", {
          position: "top-right",
        });
        reCallFun();
      }
    } catch (error) {
      toast.error("unexpected error!", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromishlist() {
    try {
      setIsLoading(true);
      const data = await removeProductFromWishlist(productId);
      if (data.status === "success") {
        setWishlistIds(data.data);
        toast.success("Product removed from your wishlist", {
          position: "top-right",
        });
        reCallFun();
      }
    } catch (error) {
      toast.error("unexpected error!", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Button
        className="bg-white hover:bg-white cursor-pointer"
        onClick={() => {
          if (wishlistIds.includes(productId)) {
            removeFromishlist();
          } else {
            addToWishlist();
          }
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner className="size-6 text-red-500" />
        ) : (
          <Heart
            className={`size-6 text-red-500 ${wishlistIds.includes(productId) ? "fill-red-500" : ""}`}
          />
        )}
      </Button>
    </>
  );
}
