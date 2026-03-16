"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  registerSchema,
  registerSchemaType,
} from "@/schema/validationSchema/auth.schema";
import { signupUser } from "@/actions/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Signup() {
  const [eye, setEye] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  async function handleRegister(values: registerSchemaType) {
    const respons = await signupUser(values);
    if (respons.message === "success") {
      toast.success("Account Created Successfully", { position: "top-right" });
      router.push("/signin");
    } else {
      toast.error(respons.message, { position: "top-right" });
    }
  }

  return (
    <>
      <main className="pt-17">
        <section className="main-container calc-h py-8 space-y-7">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-5xl font-bold text-center">
              Welcome to Vexora
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 font-semibold flex items-center justify-center gap-2">
              Register now!
              <div className="size-6 md:size-7">
                <img src="./vlogo.png" alt="" />
              </div>
            </p>
          </div>
          <div className="border-2 rounded-lg py-3 px-4 max-w-3xl mx-auto">
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleRegister)}
            >
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        type={eye ? "text" : "password"}
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                      <div
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer"
                        onClick={() => setEye(!eye)}
                      >
                        {eye ? (
                          <EyeOff className="size-5.5" />
                        ) : (
                          <Eye className="size-5.5" />
                        )}
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Re-password</FieldLabel>
                    <Input
                      type="password"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Rewrite your password"
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
                    <Input
                      type="text"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your phone number"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <p>
                Already have an account?
                <Link href="/signin" className="font-bold ml-1">
                  Login
                </Link>
              </p>
              <Button className="w-full cursor-pointer text-[17px]">
                {form.formState.isSubmitting ? (
                  <Spinner className="size-5" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
