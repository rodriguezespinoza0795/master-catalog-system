import postgres from "postgres";
import { Product } from "./definitions";

const sql = postgres(process.env.DATABASE_URL!);

export async function fetchData(tableName: string) {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const data = await sql.unsafe<Product[]>(query);

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
