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
      INSERT INTO ${config.dbname} (${fields}, status)
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

export async function updateInvoice(id: string, data: Record<string, string>) {
  console.log("id", id);
  console.log("data", data);

  // try {
  //   await sql`
  //     UPDATE invoices
  //     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
  //     WHERE id = ${id}
  //   `;
  // } catch (error) {
  //   return { message: "Database Error: Failed to Update Invoice." };
  // }

  // revalidatePath("/dashboard/invoices");
  // redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  console.log("id", id);
  // await sql`DELETE FROM invoices WHERE id = ${id}`;
  // revalidatePath("/dashboard/invoices");
}
