"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { VerifyCodeModal } from "@/components/verify-reset-code-modal/verify-code-modal";
import {
  forgotPasswordSchema,
  forgotPasswordSchemaType,
} from "@/schema/validationSchema/auth.schema";
import { forgotPassword } from "@/actions/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [openModal, setOpenModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const savedExpire = localStorage.getItem("otpExpire");
    if (!savedExpire) return;
    const diff = Math.floor((+savedExpire - Date.now()) / 1000);
    if (diff > 0) {
      setSeconds(diff);
    }
  }, []);
  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });
  async function handleForgotPassword(values: forgotPasswordSchemaType) {
    try {
      const data = await forgotPassword(values);
      if (data.statusMsg === "success") {
        setUserEmail(values.email);
        setOpenModal(true);
        toast.success("Reset code sent to your email", {
          position: "top-right",
        });
        const expireTime = Date.now() + 120000;
        localStorage.setItem("otpExpire", expireTime.toString());
        setSeconds(120);
      } else {
        toast.error(data.message, { position: "top-right" });
      }
    } catch (error) {
    }
  }
  return (
    <>
      <main className="pt-17">
        <section className="main-container calc-h py-8 space-y-7 flex flex-col justify-center items-center">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold">
              Reset your password
            </h1>
          </div>
          <div className="border-2 rounded-lg p-4 max-w-3xl mx-auto w-full">
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleForgotPassword)}
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                className="w-full cursor-pointer text-[17px]"
                disabled={seconds > 0 || form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Spinner className="size-5" />
                ) : (
                  "Get reset code"
                )}
              </Button>
              {seconds > 0 ? (
                <>
                  <p className="-mt-2 bg-gray-100 w-fit px-2 py-1 rounded-lg text-sm text-gray-800/90 font-medium">
                    get another code after {seconds} seconds
                  </p>
                </>
              ) : (
                ""
              )}
            </form>
            <VerifyCodeModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              userEmail={userEmail}
            />
          </div>
        </section>
      </main>
    </>
  );
}
