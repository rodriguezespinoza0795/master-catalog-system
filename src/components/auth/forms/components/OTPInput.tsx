"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: string;
}

const OTPInput = <T extends FieldValues>({
  control,
  errors,
}: OTPInputProps<T>) => {
  return (
    <>
      <Controller
        name={"confirmationCode" as Path<T>}
        control={control}
        rules={{
          required: {
            value: true,
            message: `Code Confirmation is required`,
          },
          validate: (value) => {
            if (value.length !== 6) {
              return "Code Confirmation must be 6 digits";
            }
            return true;
          },
        }}
        render={({ field }) => (
          <InputOTP
            maxLength={6}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            pattern={REGEXP_ONLY_DIGITS}
            data-testid="confirmationCode"
          >
            <InputOTPGroup className="flex justify-center w-full gap-2">
              <InputOTPSlot index={0} className="w-10 h-10 rounded-md" />
              <InputOTPSlot index={1} className="w-10 h-10 rounded-md" />
              <InputOTPSlot index={2} className="w-10 h-10 rounded-md" />
              <InputOTPSlot index={3} className="w-10 h-10 rounded-md" />
              <InputOTPSlot index={4} className="w-10 h-10 rounded-md" />
              <InputOTPSlot index={5} className="w-10 h-10 rounded-md" />
            </InputOTPGroup>
          </InputOTP>
        )}
      />
      {errors && <p className="text-sm text-red-500 text-center">{errors}</p>}
    </>
  );
};

export default OTPInput;
