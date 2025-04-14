"use client";

import { Button } from "@/components/ui/button";
import { useRegisterForm } from "./useRegisterForm";
import {
  PasswordInput,
  ConfirmPasswordInput,
  TextInput,
  PasswordValidation,
} from "@/components/auth/forms/components";

const RegisterForm = () => {
  const {
    handleSubmit,
    errors,
    onSubmit,
    control,
    passwordStrength,
    passwordChecks,
  } = useRegisterForm();

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        control={control}
        errors={errors.name?.message || ""}
        label="Full name"
        name="name"
        placeholder="John Doe"
        autoComplete="username"
      />
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
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
