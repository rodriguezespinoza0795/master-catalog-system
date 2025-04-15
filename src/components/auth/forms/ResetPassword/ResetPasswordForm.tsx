"use client";

import { Button } from "@/components/ui/button";
import { PasswordInput, ConfirmPasswordInput, OTPInput } from "../components";
import PasswordValidation from "../components/PasswordValidation";
import { useResetPassword } from "./useResetPassword";

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    errors,
    onSubmit,
    control,
    passwordStrength,
    passwordChecks,
  } = useResetPassword();

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <OTPInput
        control={control}
        errors={errors.confirmationCode?.message || ""}
      />
      <PasswordInput
        control={control}
        errors={errors.password?.message || ""}
        passwordStrength={passwordStrength}
      />
      <ConfirmPasswordInput
        control={control}
        errors={errors.confirmPassword?.message || ""}
      />
      <PasswordValidation
        passwordStrength={passwordStrength}
        passwordChecks={passwordChecks}
      />
      <Button type="submit" className="w-full">
        Reset password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
