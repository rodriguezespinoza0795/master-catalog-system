"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { ResetPasswordInputs } from "./ResetPassword.interface";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import getCognitoError from "@/utils/cognitoErrors";

export const useResetPassword = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  useEffect(() => {
    if (!email) {
      router.replace("/auth/forgot-password");
    }
  }, [email, router]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ResetPasswordInputs>({
    defaultValues: {
      email: "",
      confirmationCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["resetPassword"],
    retry: false,
    mutationFn: async (body: Omit<ResetPasswordInputs, "confirmPassword">) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/confirm-forgot-password`,
        body
      );
      return response.data;
    },
    onSuccess: (_data) => {
      router.replace("/auth/login");
      toast.success("Password reset successfully", {
        description: (
          <span className="text-gray-500">Please login to continue</span>
        ),
      });
    },
    onError: (error: any) => {
      const errorName = error?.response?.data.name;
      const errorMessage = getCognitoError(errorName);
      toast.error(errorMessage.title, {
        description: (
          <span className="text-gray-500">{errorMessage.description}</span>
        ),
      });
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    const body = {
      email: email as string,
      password: data.password,
      confirmationCode: data.confirmationCode,
    };
    mutate(body);
  };

  const checkPasswordStrength = (pass: string) => {
    const checks = {
      length: pass.length >= 8,
      lowercase: /[a-z]/.test(pass),
      uppercase: /[A-Z]/.test(pass),
      number: /\d/.test(pass),
      special: /[^a-zA-Z\d]/.test(pass),
    };
    setPasswordChecks(checks);

    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    const password = watch("password");
    checkPasswordStrength(password);
  }, [watch("password")]);

  return {
    handleSubmit,
    errors,
    onSubmit,
    control,
    passwordStrength,
    passwordChecks,
  };
};
