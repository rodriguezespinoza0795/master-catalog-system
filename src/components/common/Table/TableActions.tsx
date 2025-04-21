"use client";

import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const TableActions = ({ name, item }: { name: string; item: any }) => {
  const router = useRouter();
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          router.push(`/home/${name}/${item.id}/edit`);
        }}
      >
        <EditIcon className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <TrashIcon className="h-4 w-4" />
      </Button>
    </>
  );
};

export default TableActions;
