"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import {
  CircleUserRound,
  Heart,
  ListOrdered,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { Spinner } from "../ui/spinner";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
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
    <>
      <nav className="bg-[#F5F5F5] px-6 py-5 fixed w-full h-17 z-50">
        <div className="container mx-auto 2xl:max-w-6xl flex items-center justify-between relative">
          {/* Logo */}
          <div>
            <Link href="/">
              <div className="2xl:w-40 w-27">
                <img src="/vexora.png" alt="" />
              </div>
            </Link>
          </div>
          <Button
            onClick={toggleSidebar}
            className="p-2 bg-white text-black active:bg-gray-200 -space-x-1 hover:bg-white hover:text-black lg:hidden"
          >
            <Menu className="size-4.5 font-bold" /> <span>Menu</span>
          </Button>

          {/* Links */}
          <div className="hidden lg:block 2xl:absolute 2xl:left-1/2 2xl:-translate-x-1/2">
            <ul className="flex gap-2">
              <li className="">
                <Link
                  href="/products"
                  className={`hover:bg-black hover:text-white font-medium rounded-lg py-1 px-2 cursor-pointer duration-200 ${path == "/products" ? "active" : ""}`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={`hover:bg-black hover:text-white font-medium rounded-lg py-1 px-2 cursor-pointer duration-200 ${path == "/brands" ? "active" : ""}`}
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`hover:bg-black hover:text-white font-medium rounded-lg py-1 px-2 cursor-pointer duration-200 ${path == "/categories" ? "active" : ""}`}
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          {/* Avatar with DropdownMenu*/}
          <div className="hidden lg:flex gap-5">
            {session ? (
              <p className="space-x-1.5">
                <span>Welcome,</span>
                <span className="font-bold">
                  {session?.user?.name?.split(" ")[0]}
                </span>
              </p>
            ) : (
              ""
            )}
            {session ? (
              <div>
                <div className="relative cursor-pointer">
                  <Link href="/cart">
                    <ShoppingCart className="text-green-500" />
                  </Link>
                  <p className="bg-emerald-600 text-white rounded-[50%] size-4 flex items-center justify-center absolute -top-1/3 -right-1/2">
                    <Badge className="p-0 border-0 bg-emerald-600">
                      {isLoading ? (
                        <Spinner className="rounded-[50%]" />
                      ) : (
                        <span className="text-[12px]">{numOfCartItems}</span>
                      )}
                    </Badge>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="cursor-pointer hidden lg:block" />
                <Menu className="cursor-pointer block lg:hidden" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-1.5">
                <DropdownMenuGroup className="space-y-1">
                  {session ? (
                    <>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer hover:bg-blue-50!"
                      >
                        <Link
                          href="/profile"
                          className={`flex items-center justify-between ${path == "/profile" ? "bg-blue-50" : ""}`}
                        >
                          Profile <CircleUserRound className="text-blue-500" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer hover:bg-rose-50!"
                      >
                        <Link
                          href="/wishlist"
                          className={`flex items-center justify-between ${path == "/wishlist" ? "bg-red-50" : ""}`}
                        >
                          Wishlist{" "}
                          <Heart className="fill-red-500 text-red-500" />
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer hover:bg-yellow-50!"
                      >
                        <Link
                          href="/allorders"
                          className={`flex items-center justify-between ${path == "/allorders" ? "bg-red-50" : ""}`}
                        >
                          Your Orders{" "}
                          <ListOrdered className="text-yellow-400" />
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    ""
                  )}
                  {!session ? (
                    <>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/signup">Register</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/signin">Login</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    ""
                  )}
                </DropdownMenuGroup>
                {session ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={logOutUser}
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                ) : (
                  ""
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
