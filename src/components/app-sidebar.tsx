"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import {
  CircleUserRound,
  Heart,
  ListOrdered,
  ShoppingCart,
  SquareX,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const path = usePathname();
  const { numOfCartItems, isLoading } = useContext(cartQuantityContext);
  const { data: session, status } = useSession();
  function logOutUser() {
    setTimeout(() => {
      toast.info("Logged out!", { position: "top-right" });
      signOut({ callbackUrl: "/signin" });
    }, 2000);
  }
  return (
    <Sidebar collapsible="offcanvas" side="right" className="lg:hidden">
      <SidebarContent className="py-3 px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold text-black px-3">
            Menu <SquareX className="size-7! ml-auto" onClick={toggleSidebar} />
          </SidebarGroupLabel>
          <hr className="border-gray-600 border my-3" />
          <SidebarGroupContent>
            <div className="2xl:absolute 2xl:left-1/2 2xl:-translate-x-1/2 2xl:block">
              <ul className="flex flex-col gap-4 mt-3 *:text-lg">
                <li>
                  <Link
                    href={`/products`}
                    onClick={toggleSidebar}
                    className={`${path == "/products" ? "active" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg font-medium`}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/brands`}
                    onClick={toggleSidebar}
                    className={`${path == "/brands" ? "active" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg font-medium`}
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/categories`}
                    onClick={toggleSidebar}
                    className={`${path == "/categories" ? "active" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg font-medium`}
                  >
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="border-gray-600 border my-6" />
            {session ? (
              <>
                <div className="h-full flex flex-col justify-between">
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href={`/profile`}
                        onClick={toggleSidebar}
                        className={`${path == "/profile" ? "bg-blue-50" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg`}
                      >
                        <CircleUserRound className="text-blue-500" />
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/cart`}
                        onClick={toggleSidebar}
                        className={`${path == "/cart" ? "bg-green-50" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg`}
                      >
                        <ShoppingCart className="text-green-500" />
                        <span>Cart</span>
                        <span className="ml-auto text-[12px] text-gray-800 font-medium bg-gray-200 rounded-lg px-2 py-0.5">
                          {isLoading ? (
                            <Spinner className="size-4" />
                          ) : (
                            <span>{numOfCartItems} items</span>
                          )}
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/wishlist`}
                        onClick={toggleSidebar}
                        className={`${path == "/wishlist" ? "bg-red-50" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg`}
                      >
                        <Heart className="fill-red-500 text-red-500" />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/allorders`}
                        onClick={toggleSidebar}
                        className={`${path == "/allorders" ? "bg-yellow-50" : ""} flex items-center gap-1.5 text-lg px-2 py-1 rounded-lg`}
                      >
                        <ListOrdered className="text-yellow-400" />
                        <span>All Orders</span>
                      </Link>
                    </li>
                  </ul>
                  <Button
                    className="bg-gray-200 text-red-500"
                    onClick={logOutUser}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              ""
            )}
            {!session ? (
              <>
                <div className="px-3">
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href={"signup"}
                        onClick={toggleSidebar}
                        className="text-lg px-2 py-1 rounded-lg bg-gray-200 text-green-600 font-medium"
                      >
                        Join us Now!
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"signin"}
                        onClick={toggleSidebar}
                        className="text-lg px-2 py-1 rounded-lg bg-gray-200 text-green-600 font-medium"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {session ? (
        <>
          <SidebarFooter className="border-t-2">
            <p className="mx-auto">
              Logged in as{" "}
              <span className="font-semibold">
                {session?.user?.name?.split(" ")[0]}{" "}
              </span>
            </p>
          </SidebarFooter>
        </>
      ) : (
        ""
      )}
    </Sidebar>
  );
}
