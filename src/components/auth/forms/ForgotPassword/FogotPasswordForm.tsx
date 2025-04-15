"use client";
import { Button } from "@/components/ui/button";
import { TextInput } from "../components";
import useForgotPassword from "./useForgotPassword";

export const ForgotPasswordForm = () => {
  const { handleSubmit, errors, control, onSubmit } = useForgotPassword();
  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        control={control}
        errors={errors.email?.message || ""}
        label="Email"
        name="email"
        placeholder="john.doe@example.com"
        autoComplete="email"
        pattern={/^\S+@\S+\.\S+$/}
      />
      <Button type="submit" className="w-full">
        Send reset code
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
