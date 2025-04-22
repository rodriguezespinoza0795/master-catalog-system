import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function fetchData(tableName: string, page: number) {
  try {
    const query = `SELECT * FROM ${tableName} LIMIT ${ITEMS_PER_PAGE} OFFSET ${
      (page - 1) * ITEMS_PER_PAGE
    }`;
    const data = await sql.unsafe(query);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}

export async function fetchDataPages(tableName: string) {
  try {
    const query = `SELECT COUNT(*) as total FROM ${tableName}`;
    const data = await sql.unsafe(query);

    const totalPages = Math.ceil(Number(data[0].total) / ITEMS_PER_PAGE);
    return { totalPages, totalItems: data[0].total };
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
