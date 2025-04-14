"use client";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { RegisterInputs } from "./Register.interface";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import getCognitoError from "@/utils/cognitoErrors";

export const useRegisterForm = () => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<RegisterInputs>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const { mutate } = useMutation({
    mutationKey: ["register"],
    retry: false,
    mutationFn: async (body: Omit<RegisterInputs, "confirmPassword">) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        body
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      router.replace(`/auth/verify-email?email=${variables.email}`);
      toast.success("User created successfully", {
        description: (
          <span className="text-gray-500">Please verify your account</span>
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

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
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
