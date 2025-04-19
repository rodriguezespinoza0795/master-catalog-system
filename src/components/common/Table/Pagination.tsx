import { Button } from "@/components/ui/button";

const Pagination = ({ totalItems }: { totalItems: number }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        Showing <strong>1</strong> to <strong>{totalItems}</strong> of{" "}
        <strong>{totalItems}</strong> entries
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-primary text-primary-foreground"
        >
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
