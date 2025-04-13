"use client";

import { Button } from "@/components/ui/button";
import { TextInput, PasswordInput } from "@/components/auth/forms/components";
import { useLoginForm } from "@/components/auth/forms/LoginForm/useLoginForm";

export const LoginForm = () => {
  const { handleSubmit, errors, control, onSubmit } = useLoginForm();
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
      <PasswordInput
        control={control}
        errors={errors.password?.message || ""}
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
