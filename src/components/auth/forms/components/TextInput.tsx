"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: string;
  label: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  pattern?: RegExp;
}

const TextInput = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder,
  autoComplete,
  pattern = /^[a-zA-ZÀ-ÿ\s]*$/,
}: TextInputProps<T>) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={{
          required: {
            value: true,
            message: `${label} is required`,
          },
          pattern: {
            value: pattern,
            message: `${label} is invalid`,
          },
        }}
        render={({ field }) => (
          <Input
            id={name}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`${errors ? "border-red-500 placeholder-red-500" : ""}`}
            {...field}
          />
        )}
      />
      {errors && <span className="text-red-500 text-xs">{errors}</span>}
    </div>
  );
};

export default TextInput;
