import { getUserData } from "@/lib/auth";
import { ChevronRight, CircleUserRound } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/interface/orders";
import { getUserOrders } from "@/actions/orders.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLoggedUserWishlist } from "@/actions/wishlist.action";
import { Product } from "@/interface/product";
import Image from "next/image";
import React from "react";

interface userDataI {
  name: string;
  email: string;
}

export default async function Profile() {
  const userData: userDataI = await getUserData();
  const userOrders: Order[] = await getUserOrders();
  const latestOrders = userOrders.slice(-5);
  const userWishlist = await getLoggedUserWishlist();
  const latestWishlistItems: Product[] = userWishlist.slice(-3);

  return (
    <>
      <main className="pt-17">
        <section className="main-container calc-h py-8 space-y-7">
          <h2 className="text-[20px] md:text-2xl font-bold flex items-center gap-1.5">
            My Profile <CircleUserRound className="text-blue-500" />
          </h2>

          <div className="space-y-4">
            {/* personal information */}
            <div>
              <h3 className="text-[18px] text-gray-700 md:text-2xl font-medium mb-4">
                Personal Information
              </h3>
              <div className="border-2 border-blue-300 rounded p-1">
                <Table className="">
                  <TableBody className="space-y-2">
                    <TableRow className="flex justify-between">
                      <TableCell className="font-medium">Full Name:</TableCell>
                      <TableCell>{userData.name}</TableCell>
                    </TableRow>
                    <TableRow className="flex justify-between">
                      <TableCell className="font-medium">Email:</TableCell>
                      <TableCell>{userData.email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="lg:flex lg:gap-4 lg:items-stretch">
              {/* latest orders */}
              <div className="lg:flex-1">
                <h3 className="text-[18px] text-gray-700 md:text-2xl font-medium mb-4">
                  Order History
                </h3>
                <div className="border-2 border-yellow-300 rounded p-1 space-y-3 text-center">
                  <Table className="">
                    <TableBody className="space-y-2">
                      {latestOrders.map((userOrder) => (
                        <React.Fragment key={userOrder._id}>
                          <TableRow className="flex justify-between">
                            <TableCell className="font-medium">
                              #{userOrder.id}
                            </TableCell>
                            <TableCell className="text-blue-500">
                              {userOrder.isDelivered ? (
                                <>
                                  <span>Delivered</span>
                                </>
                              ) : (
                                <>
                                  <span>not delivered</span>
                                </>
                              )}
                            </TableCell>
                            <TableCell>
                              {userOrder.totalOrderPrice} EGP
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                  <Button
                    asChild
                    className="bg-blue-500 text-white mt-2 mb-4 w-8/10 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 duration-200 transition-colors"
                  >
                    <Link href={"/allorders"}>
                      View All Orders <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </div>
              {/* wishlist */}
              <div className="lg:flex-1">
                <h3 className="text-[18px] text-gray-700 md:text-2xl font-medium mb-4">
                  Wishlist
                </h3>
                <div className="border-2 border-red-300 rounded p-1 space-y-3 text-center">
                  <div className="p-2">
                    <div className="space-y-5 lg:space-y-0 md:flex md:gap-3 md:justify-center">
                      {latestWishlistItems.map((userWishlistItem) => (
                        <React.Fragment key={userWishlistItem._id}>
                          <div className="border shadow-sm p-2 rounded">
                            <div className="relative size-40 mx-auto">
                              <Image
                                src={userWishlistItem.imageCover}
                                fill
                                alt=""
                                className="object-contain"
                              />
                            </div>
                            <div className="text-gray-700">
                              {userWishlistItem.title}
                            </div>
                            <div>{userWishlistItem.price} EGP</div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-blue-500 text-white mt-2 mb-4 w-8/10 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500 duration-200 transition-colors"
                  >
                    <Link href={"/wishlist"}>
                      View Wishlist <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
