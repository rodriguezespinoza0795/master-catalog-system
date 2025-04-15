"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import type { VerifyEmailInputs } from "./VerifyEmail.interface";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import getCognitoError from "@/utils/cognitoErrors";
import { useEffect } from "react";

export const useVerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;

  useEffect(() => {
    if (!email) {
      router.replace("/auth/login");
    }
  }, [email, router]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<VerifyEmailInputs>({
    defaultValues: { email: email, confirmationCode: "" },
  });

  const { mutate } = useMutation({
    mutationKey: ["verifyEmail"],
    retry: false,
    mutationFn: async (data: VerifyEmailInputs) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-email`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Account verified", {
        description: (
          <span className="text-gray-500">
            Your email has been successfully verified. You can now log in.
          </span>
        ),
      });
      router.replace("/auth/login");
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

  const onSubmit: SubmitHandler<VerifyEmailInputs> = async (data) => {
    const body = {
      email: data.email,
      confirmationCode: data.confirmationCode,
    };

    mutate(body);
  };

  const { mutate: resendCode } = useMutation({
    mutationKey: ["resendCode"],
    mutationFn: async (email: string) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resend-confirmation-code`,
        { email }
      );
      return response.data;
    },
    onSuccess: (_data) => {
      toast.success("Verification code sent", {
        description: (
          <span className="text-gray-500">
            Check your email for the verification code.
          </span>
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

  const handleResendCode = async () => {
    resendCode(email);
  };
  return {
    handleSubmit,
    onSubmit,
    control,
    errors,
    email,
    handleResendCode,
  };
};
