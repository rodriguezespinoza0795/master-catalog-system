"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface ConfirmPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: string;
}

const ConfirmPasswordInput = <T extends FieldValues>({
  control,
  errors,
}: ConfirmPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid gap-2">
      <Label htmlFor="confirm-password">Confirm password</Label>
      <Controller
        name={"confirmPassword" as Path<T>}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Confirm password is required",
          },
          validate: {
            match: (value) => {
              const password = control._formValues.password;
              if (value !== password) {
                return "Passwords do not match";
              }
            },
          },
        }}
        render={({ field }) => (
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className={`${
                errors ? "border-red-500 placeholder-red-500" : ""
              }`}
              {...field}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  data-testid="icon-eye-off"
                  className="h-4 w-4 text-muted-foreground"
                />
              ) : (
                <Eye
                  data-testid="icon-eye"
                  className="h-4 w-4 text-muted-foreground"
                />
              )}
            </Button>
          </div>
        )}
      />
      {errors && <span className="text-red-500 text-xs">{errors}</span>}
    </div>
  );
};

export default ConfirmPasswordInput;
