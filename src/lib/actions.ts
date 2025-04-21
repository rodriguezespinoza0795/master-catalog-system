"use server";

import { CatalogConfig } from "@/components/catalogs/catalog.utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export async function createNewRecord(
  data: Record<string, string>,
  config: CatalogConfig
) {
  // Insert data into the database
  const fields = config.create.map((field) => field.name).join(", ");
  const values = config.create
    .map((field) => {
      if (field.type === "text") {
        return `'${data[field.name]}'`;
      }
      return data[field.name];
    })
    .join(", ");

  try {
    const query = `
      INSERT INTO ${config.dbTableName} (${fields}, status)
      VALUES (${values}, 'Active')
    `;
    await sql.unsafe(query);
  } catch (error) {
    // If a database error occurs, return a more specific error.
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
  const values = Object.entries(data)
    .map(([key, value]) => {
      const type = config.create.find((field) => field.name === key)?.type;
      if (type === "text") {
        return `${key} = '${value}'`;
      }
      return `${key} = ${value}`;
    })
    .join(", ");

  try {
    const query = `
    UPDATE ${config.dbTableName}
    SET ${values}
    WHERE id = ${id}
  `;
    await sql.unsafe(query);
  } catch (error) {
    return { message: "Database Error: Failed to update record." };
  }

  revalidatePath(`/home/${config.route}`);
  redirect(`/home/${config.route}`);
}

export async function deleteRecord(id: string, config: CatalogConfig) {
  try {
    const query = `
    UPDATE ${config.dbTableName}
    SET status = 'Inactive'
    WHERE id = ${id}
  `;
    await sql.unsafe(query);
    revalidatePath(`/home/${config.route}`);
  } catch (error) {
    return { message: "Database Error: Failed to delete record." };
  }
}
