"use server";

import { CatalogConfig } from "@/components/catalogs/catalog.utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export async function createNewRecord(
  data: Record<string, string>,
  config: CatalogConfig
) {
  const model = prisma[config.dbTableName as keyof typeof prisma] as any;
  try {
    const parsedData = config.create
      .map((field) => {
        if (["decimal", "number"].includes(field.type)) {
          return { [field.name]: parseFloat(data[field.name]) };
        }
        return { [field.name]: data[field.name] };
      })
      .reduce<Record<string, string | number>>(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );

    await model.create({
      data: {
        ...parsedData,
        status: "Active",
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: `Database Error: Failed to Create ${config.title}.`,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`/home/${config.route}`);
  redirect(`/home/${config.route}`);
}

export async function updateRecord(
  id: string,
  data: Record<string, string>,
  config: CatalogConfig
) {
  try {
    const model = prisma[config.dbTableName as keyof typeof prisma] as any;
    const parsedData = config.create
      .map((field) => {
        if (["decimal", "number"].includes(field.type)) {
          return { [field.name]: parseFloat(data[field.name]) };
        }
        return { [field.name]: data[field.name] };
      })
      .reduce<Record<string, string | number>>(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );

    await model.update({
      where: { id },
      data: { ...parsedData },
    });
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update record." };
  }

  revalidatePath(`/home/${config.route}`);
  redirect(`/home/${config.route}`);
}

export async function deleteRecord(id: string, config: CatalogConfig) {
  try {
    const model = prisma[config.dbTableName as keyof typeof prisma] as any;
    await model.update({
      where: { id },
      data: { status: "Inactive" },
    });
    revalidatePath(`/home/${config.route}`);
  } catch (error) {
    return { message: "Database Error: Failed to delete record." };
  }
}
