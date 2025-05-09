import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import DynamicForm from "@/components/catalogs/DynamicForm";
import { getCatalogConfig } from "@/components/catalogs/catalog.utils";

type Props = {
  params: {
    table: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const routeConfig = await getCatalogConfig(params.table);

  if (!routeConfig) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `New ${routeConfig.title} - Master Catalog System`,
  };
}

export default async function NewCatalogItemPage({ params }: Props) {
  const { table } = await params;
  const routeConfig = await getCatalogConfig(table);

  if (!routeConfig) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 px-4 md:px-6 py-10">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/home/${table}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">
          New {routeConfig.title}
        </h1>
      </div>
      <DynamicForm config={routeConfig} />
    </div>
  );
}
