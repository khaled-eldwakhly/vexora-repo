"use client";

import { getLoggedUserCart } from "@/actions/cart.action";
import { CartI } from "@/interface/cart";
import { createContext, useEffect, useState } from "react";

interface CartQuantity {
  numOfCartItems: number;
  handleQuantity: () => void;
  isLoading: boolean;
}

export const cartQuantityContext = createContext<CartQuantity>({
  numOfCartItems: 0,
  handleQuantity: () => {},
  isLoading: false,
});
export default function CartQuantityContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  async function handleQuantity() {
    try {
      setIsLoading(true);
      const data: CartI = await getLoggedUserCart();
      const total = data.data.products.reduce(
        (accu, product) => product.count + accu,
        0,
      );
      setNumOfCartItems(total);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleQuantity();
  }, []);

  return (
    <cartQuantityContext.Provider
      value={{ numOfCartItems, handleQuantity, isLoading }}
    >
      {children}
    </cartQuantityContext.Provider>
  );
}
