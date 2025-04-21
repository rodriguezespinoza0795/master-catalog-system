"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCatalogConfig } from "@/components/catalogs/catalog.utils";

const PageHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  const moduleConfig = getCatalogConfig(title);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            {moduleConfig.title} Catalog
          </h1>
        </div>
        <Button
          size={"default"}
          onClick={() => {
            router.push(`/home/${title}/new`);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Add</span> {moduleConfig.title}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
