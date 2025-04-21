import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export async function fetchData(tableName: string) {
  try {
    const query = `SELECT * FROM ${tableName}`;
    const data = await sql.unsafe(query);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}

export async function fetchDataById(tableName: string, id: string) {
  try {
    const query = `SELECT * FROM ${tableName} WHERE id = ${id}`;
    const data = await sql.unsafe(query);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}
