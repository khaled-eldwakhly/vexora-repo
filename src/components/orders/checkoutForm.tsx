"use client";

import { checkoutSession, createCashOrder } from "@/actions/orders.action";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ShippingAddressI } from "@/interface/orders";
import { cartQuantityContext } from "@/providers/cart-quantity-context";
import { checkoutFormSchema } from "@/schema/checkout-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [userAddresses, setUserAddresses] = useState([]);
  const [isLoadingCash, setIsLoadingCash] = useState(false);
  const [isLoadingOnline, setIsLoadingOnline] = useState(false);
  const [online, setOnline] = useState(false);
  const { handleQuantity } = useContext(cartQuantityContext);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    mode: "all",
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  async function handleCheckout(values: ShippingAddressI) {
    if (!online) {
      try {
        setIsLoadingCash(true);
        const shippingAddress = { ...values };
        const data = await createCashOrder(cartId, shippingAddress);
        if (data.status === "success") {
          toast.success("Order checked out successfully!", {
            position: "top-right",
          });
          router.push("/allorders");
          handleQuantity();
        }
      } catch (error) {
      } finally {
        setIsLoadingCash(false);
      }
    } else {
      try {
        setIsLoadingOnline(true);
        const shippingAddress = { ...values };
        const data = await checkoutSession(cartId, shippingAddress);
        if (data.status === "success") {
          router.push(data.session.url);
        }
      } catch (error) {
      } finally {
        setIsLoadingOnline(false);
      }
    }
  }
  return (
    <>
      <div className="border-2 rounded-lg p-4 max-w-3xl mx-auto w-full">
        <form
          className="space-y-5"
          onSubmit={form.handleSubmit(handleCheckout)}
        >
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                <Input
                  type="text"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your Details"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone"
                    autoComplete="off"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your City"
                    autoComplete="off"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="postalCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Postal code</FieldLabel>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your City"
                    autoComplete="off"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
      
          <div className="flex *:grow gap-3 *:bg-white *:text-black *:border-2 *:border-black *:hover:bg-black *:hover:text-white *:duration-200">
            <Button
              className="cursor-pointer text-[17px]"
              onClick={() => setOnline(false)}
            >
              {isLoadingCash ? (
                <Spinner className="size-5" />
              ) : (
                <span className="flex items-center gap-2">
                  Cash <Wallet />
                </span>
              )}
            </Button>
            <Button
              className="cursor-pointer text-[17px]"
              onClick={() => setOnline(true)}
            >
              {isLoadingOnline ? (
                <Spinner className="size-5" />
              ) : (
                <span className="flex items-center gap-2">
                  Online <CreditCard />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
