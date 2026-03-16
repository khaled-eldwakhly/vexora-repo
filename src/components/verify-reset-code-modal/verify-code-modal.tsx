"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyResetCode } from "@/actions/auth.services";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResetPasswordModal } from "../reset-password-modal/reset-password-modal";
import { Spinner } from "../ui/spinner";

export function VerifyCodeModal({
  openModal,
  setOpenModal,
  userEmail,
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  userEmail: string;
}) {
  const [openResetModal, setOpenResetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState("");
  useEffect(() => {
    console.log(otpValues);
  }, [otpValues]);

  async function verifyCode(otpValues: string) {
    try {
      setIsLoading(true);
      const data = await verifyResetCode(otpValues);
      console.log(data.status);
      if (data.status === "Success") {
        toast.success("Code Verifyed", { position: "top-right" });
        setOpenModal(false);
        setOpenResetModal(true);
      } else {
        toast.error("Reset code is invalid or expired!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <form>
          <DialogContent className="sm:max-w-sm *:mx-auto">
            <DialogHeader>
              <DialogTitle>Enter Your Reset Code</DialogTitle>
              <span className=" text-sm text-gray-500 text-center font-medium -mt-1">
                * get it from your email
              </span>
            </DialogHeader>
            <InputOTP
              maxLength={6}
              id="digits-only"
              pattern={REGEXP_ONLY_DIGITS}
              value={otpValues}
              onChange={(otpValues) => setOtpValues(otpValues)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <DialogFooter>
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
                onClick={() => verifyCode(otpValues)}
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? <Spinner className="size-5" /> : "Send"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <ResetPasswordModal
        openResetModal={openResetModal}
        setOpenResetModal={setOpenResetModal}
        userEmail={userEmail}
      />
    </>
  );
}
