"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
interface PasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  errors: string;
  passwordStrength?: number;
}

const PasswordInput = <T extends FieldValues>({
  control,
  errors,
  passwordStrength,
}: PasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid gap-2">
      <Label htmlFor="password">Password</Label>
      <Controller
        name={"password" as Path<T>}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Password is required",
          },
          validate: {
            required: () => {
              if (passwordStrength && passwordStrength < 5) {
                return "Password is too weak";
              }
            },
          },
        }}
        render={({ field }) => (
          <div className="relative">
            <Input
              id="password"
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
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        )}
      />
      {errors && <span className="text-red-500 text-xs">{errors}</span>}
    </div>
  );
};

export default PasswordInput;
