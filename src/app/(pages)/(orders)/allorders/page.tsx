"use client";

import { getUserOrders } from "@/actions/orders.action";
import ClientLoader from "@/components/common/clientLoader";
import { Order } from "@/interface/orders";
import {
  CircleCheck,
  CircleX,
  ListOrdered,
  Smile
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  async function getOrders() {
    try {
      const data: Order[] = await getUserOrders();
      setUserOrders(data);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (isFetching)
    return (
      <main className="pt-17">
        <ClientLoader />
      </main>
    );
  if (!userOrders || userOrders.length === 0)
    return (
      <main className="pt-17">
        <section className="calc-h flex justify-center items-center">
          <div className="-translate-y-1/2 text-center space-y-4">
            <h3 className="text-gray-900 text-3xl font-bold">
              You not created any Order yet!
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
                and create your first{" "}
                <span className="text-yellow-500">Order</span>{" "}
                <Smile className="inline-block text-yellow-500" />
              </span>
            </p>
          </div>
        </section>
      </main>
    );
  return (
    <>
      <main className="py-17">
        <section className="main-container calc-h py-8 space-y-7">
          <h2 className="text-[20px] md:text-2xl font-bold flex items-center gap-1.5">
            My Orders <ListOrdered className="text-yellow-400" />
          </h2>
          <div className="grid grid-cols-12 *:border-2 *:border-gray-300 *:rounded-lg *:overflow-hidden gap-7 *:py-2 *:px-4 *:bg-gray-100 *:hover:shadow *:hover:scale-103 *:duration-200">
            {/* one card */}
            {userOrders?.map((order) => (
              <React.Fragment key={order._id}>
                <div className="col-span-12 md:col-span-6">
                  {/* header */}
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold">Order #{order.id}</span>
                      <span>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="flex items-center gap-0.5">
                        {order.isPaid ? (
                          <div className="flex flex-col">
                            <span>
                              Paid
                              <CircleCheck className="text-green-500 size-5 ml-0.5 inline-block" />
                            </span>
                            <span>by: {order.paymentMethodType}</span>
                            <span>
                              {order.isDelivered
                                ? "Delivered"
                                : "*awaiting delivery"}
                            </span>
                          </div>
                        ) : (
                          <>
                            not paid!{" "}
                            <CircleX className="text-red-500 size-5 ml-0.5" />
                          </>
                        )}
                      </span>
                      <span>Total: {order.totalOrderPrice} EGP</span>
                    </div>
                  </div>
                  <hr className="border-gray-500 my-3" />
                  {/* Shiping */}
                  <div>
                    <p className="font-semibold mb-2">Shipping Address:</p>
                    <ul className="space-y-1">
                      <li>
                        City: <span>{order.shippingAddress.city}</span>
                      </li>
                      <li>
                        Phone: <span>{order.shippingAddress.phone}</span>
                      </li>
                      <li>
                        Details: <span>{order.shippingAddress.details}</span>
                      </li>
                    </ul>
                  </div>
                  <hr className="border-gray-500 my-3" />
                  {/* items */}
                  <div className="">
                    <div
                      className={`overflow-auto ${order.cartItems.length === 1 ? "max-h-fit" : "max-h-75 "}  space-y-3`}
                    >
                      {order.cartItems.map((cartItem) => (
                        <React.Fragment key={cartItem._id}>
                          <div className="text-center md:flex md:gap-1.5 border border-gray-400 pb-2 overflow-hidden bg-gray-200 rounded">
                            <div className="relative mx-auto bg-white">
                              <Image
                                src={cartItem.product.imageCover}
                                width={160}
                                height={160}
                                alt=""
                                className="object-cover mx-auto"
                              />
                            </div>
                            <div className="py-2 flex flex-col">
                              <span className="text-[13px] font-semibold">
                                {cartItem.product.title}
                              </span>
                              <span className="text-[13px]">
                                Qty: {cartItem.count}
                              </span>
                              <span className="text-[13px]">
                                Price: {cartItem.price} EGP
                              </span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
