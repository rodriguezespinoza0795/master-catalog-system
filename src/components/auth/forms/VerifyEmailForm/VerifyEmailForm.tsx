"use client";

import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/auth/forms/components";
import { useVerifyEmail } from "@/components/auth/forms/VerifyEmailForm/useVerifyEmail";

const VerifyEmailForm = () => {
  const { handleSubmit, onSubmit, control, errors, handleResendCode } =
    useVerifyEmail();

  return (
    <div className="flex flex-col gap-6">
      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <OTPInput
          control={control}
          errors={errors.confirmationCode?.message || ""}
        />
        <Button type="submit" className="w-full">
          Verify Code
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?
        </p>
        <Button
          variant="link"
          className="text-sm p-0"
          onClick={handleResendCode}
        >
          Resend code
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
