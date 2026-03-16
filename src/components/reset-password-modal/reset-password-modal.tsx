"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "@/schema/validationSchema/auth.schema";
import { resetPassword } from "@/actions/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export function ResetPasswordModal({
  openResetModal,
  setOpenResetModal,
  userEmail,
}: {
  openResetModal: boolean;
  setOpenResetModal: (openModal: boolean) => void;
  userEmail: string;
}) {
  const [eye, setEye] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (userEmail) {
      form.reset({
        ...form.getValues(),
        email: userEmail,
      });
    }
  }, [userEmail]);

  async function handleResetPassword(values: resetPasswordSchemaType) {
    const data = await resetPassword(values);
    if (data.token) {
      router.push("/signin");
      toast.success("Password Updated!", { position: "top-right" });
    }
  }

  return (
    <>
      <Dialog open={openResetModal} onOpenChange={setOpenResetModal}>
        <form>
          <DialogContent className="sm:max-w-sm *:mx-auto">
            <DialogHeader>
              <DialogTitle>Enter Your new Password</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleResetPassword)}
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
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New password</FieldLabel>
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

              <Button className="w-full cursor-pointer text-[17px]">
                {form.formState.isSubmitting ? (
                  <Spinner className="size-5" />
                ) : (
                  "Reset"
                )}
              </Button>
            </form>

            {/* <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                // onClick={() => verifyCode(otpValues)}
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? <Spinner className="size-5" /> : "Send"}
              </Button>
            </DialogFooter> */}
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
