"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";
import { createNewRecord, updateRecord } from "@/lib/actions";
import { CatalogConfig } from "@/components/catalogs/catalog.utils";

interface DynamicFormInputs {
  [key: string]: string;
}

const DynamicForm = ({
  config,
  defaultData,
}: {
  config: CatalogConfig;
  defaultData?: any;
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<DynamicFormInputs>({
    defaultValues: config.create.reduce((acc, field) => {
      acc[field.name] = defaultData?.[field.name] || "";
      return acc;
    }, {} as DynamicFormInputs),
  });

  const onSubmit: SubmitHandler<DynamicFormInputs> = async (data) => {
    try {
      if (defaultData) {
        updateRecord(defaultData.id, data, config);
      } else {
        createNewRecord(data, config);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating record");
    }
  };

  const pattern = {
    text: /^[a-zA-ZÀ-ÿ\s,]*$/,
    number: /^[0-9]*$/,
    decimal: /^[0-9]*(\.[0-9]*)?$/,
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <div className="grid p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <CardContent>
                <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                  {config.create.map((field) => (
                    <div className="grid gap-2" key={field.name}>
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Controller
                        name={field.name}
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: `${field.label} is required`,
                          },
                          pattern: {
                            value: pattern[field.type as keyof typeof pattern],
                            message: `${field.label} is invalid`,
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            id={field.name}
                            placeholder={`Enter ${field.name}`}
                            autoComplete={field.name}
                            className={`${
                              errors[field.name]
                                ? "border-red-500 placeholder-red-500"
                                : ""
                            }`}
                            {...field}
                          />
                        )}
                      />
                      {errors?.[field.name] && (
                        <span className="text-red-500 text-xs">
                          {errors?.[field.name]?.message}
                        </span>
                      )}
                    </div>
                  ))}
                  <Button type="submit" className="w-full">
                    {defaultData ? "Update" : "Create"}
                  </Button>
                </form>
              </CardContent>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DynamicForm;
