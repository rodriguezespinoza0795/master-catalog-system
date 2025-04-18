import { Database } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Database className="h-16 w-16 mb-4 text-muted-foreground" />
      <h2 className="text-2xl font-bold mb-2">Select a Catalog</h2>
      <p className="text-muted-foreground max-w-md">
        Choose a catalog from the sidebar to view and manage its entries.
      </p>
    </div>
  );
};

export default HomePage;
