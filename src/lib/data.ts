import { prisma } from "@/lib/prisma";
import { serializePrismaData } from "@/utils/serializeDecimal";

const ITEMS_PER_PAGE = 5;

export async function fetchData(
  tableName: string,
  page: number
): Promise<{ data: any[]; total: number; totalPages: number }> {
  const model = prisma[tableName as keyof typeof prisma] as any;
  try {
    const [data, total] = await Promise.all([
      model.findMany({
        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
      }),
      model.count(),
    ]);

    const totalPages = Math.ceil(Number(total) / ITEMS_PER_PAGE);

    return {
      data: serializePrismaData(data),
      total,
      totalPages,
    };
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}

export async function fetchDataById(tableName: string, id: string) {
  try {
    const model = prisma[tableName as keyof typeof prisma] as any;
    const data = await model.findUnique({
      where: { id },
    });

    return serializePrismaData([data])[0];
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}
