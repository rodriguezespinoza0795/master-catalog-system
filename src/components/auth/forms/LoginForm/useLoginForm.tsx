"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginInputs } from "@/components/auth/forms/LoginForm/Login.interface";
import getCognitoError from "@/utils/cognitoErrors";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const useLoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "" },
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    retry: false,
    mutationFn: async (body: LoginInputs) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        body
      );
      return response.data;
    },
    onSuccess: (data) => {
      sessionStorage.setItem(
        "tokens",
        JSON.stringify(data.AuthenticationResult)
      );
      router.replace("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any, variables) => {
      const errorName = error?.response?.data.name;
      const errorMessage = getCognitoError(errorName);
      toast.error(errorMessage.title, {
        description: (
          <span className="text-gray-500">{errorMessage.description}</span>
        ),
      });
      if (errorName === "UserNotConfirmedException") {
        router.replace(`/auth/verify-email?email=${variables.email}`);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const body = {
      email: data.email,
      password: data.password,
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
