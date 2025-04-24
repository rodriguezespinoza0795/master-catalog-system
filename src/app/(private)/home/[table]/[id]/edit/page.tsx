import { getCatalogConfig } from "@/components/catalogs/catalog.utils";
import DynamicForm from "@/components/catalogs/DynamicForm";
import { Button } from "@/components/ui/button";
import { fetchDataById } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const EditPage = async ({
  params,
}: {
  params: { table: string; id: string };
}) => {
  const { table, id } = await params;
  const routeConfig = await getCatalogConfig(table);
  const dbTableName = routeConfig.dbTableName;
  const data = await fetchDataById(dbTableName, id);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-6 py-10">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/home/${table}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          Update {routeConfig.title}
        </h1>
      </div>
      <DynamicForm config={routeConfig} defaultData={data} />
    </div>
  );
};

export default EditPage;
