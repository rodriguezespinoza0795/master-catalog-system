"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ForgotPasswordInputs } from "./ForgotPassword.interface";
import getCognitoError from "@/utils/cognitoErrors";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const useForgotPassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ForgotPasswordInputs>({
    defaultValues: { email: "" },
  });

  const { mutate } = useMutation({
    mutationKey: ["forgotPassword"],
    retry: false,
    mutationFn: async (body: ForgotPasswordInputs) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
        body
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      router.replace(`/auth/reset-password?email=${variables.email}`);

      toast.success("Password reset code sent", {
        description: (
          <span className="text-gray-500">
            Check your email for the reset code.
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

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    const body = {
      email: data.email,
    };

    mutate(body);
  };

  return {
    handleSubmit,
    errors,
    control,
    onSubmit,
  };
};

export default useForgotPassword;
