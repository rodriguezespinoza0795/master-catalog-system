import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PageHeader = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            {title} Catalog
          </h1>
        </div>
        <Button size={"default"}>
          <Plus className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Add</span> {title}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
