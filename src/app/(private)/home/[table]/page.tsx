import { Table } from "@/components/common/Table";
import PageHeader from "@/components/common/Table/PageHeader";
import Toolbar from "@/components/common/Table/Toolbar";
import { fetchData, fetchDataPages } from "@/lib/data";
import PaginationComponent from "@/components/common/Table/Pagination";
import { getCatalogConfig } from "@/components/catalogs/catalog.utils";

const getTableHeaders = (subcatalogId: string | null = null) => {
  // Headers for each module and subcatalog
  const headers: Record<string, string[]> = {
    "products-list": [
      "Name",
      "Category",
      "Status",
      "Stock",
      "Price",
      "Actions",
    ],
    "product-sizes": ["Name", "Code", "Status", "Description", "Actions"],
    "product-categories": ["Name", "Status", "Description", "Actions"],

    "suppliers-list": [
      "Name",
      "Category",
      "Status",
      "Contact",
      "Location",
      "Actions",
    ],
    "supplier-types": ["Name", "Status", "Description", "Actions"],

    "customers-list": [
      "Name",
      "Category",
      "Status",
      "Contact",
      "Location",
      "Actions",
    ],
    "customer-segments": ["Name", "Status", "Description", "Actions"],
    "contact-methods": ["Name", "Status", "Description", "Actions"],

    "documents-list": [
      "Name",
      "Category",
      "Status",
      "Version",
      "Last Updated",
      "Actions",
    ],
    "document-types": ["Name", "Status", "Description", "Actions"],

    "organizations-list": [
      "Name",
      "Category",
      "Status",
      "Manager",
      "Employees",
      "Actions",
    ],
    departments: ["Name", "Status", "Description", "Actions"],
  };

  if (!subcatalogId) return [];

  return headers[subcatalogId as keyof typeof headers];
};

const HomePage = async (props: {
  params: Promise<{
    table?: string;
    module?: string;
  }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const routeConfig = await getCatalogConfig(params?.table as string);
  const totalPages = await fetchDataPages(routeConfig.dbTableName);

  const headers = getTableHeaders(params?.table as string);

  const dbData = await fetchData(routeConfig.dbTableName, currentPage);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <main className="flex flex-col  overflow-auto px-4 md:px-6 h-full py-10 gap-10">
        <PageHeader title={params?.table as string} />
        <Toolbar
          title={params?.table as string}
          name={params?.table as string}
        />
        <Table headers={headers} data={dbData} name={params?.table as string} />
        <PaginationComponent
          totalPages={totalPages.totalPages}
          totalItems={totalPages.totalItems}
        />
      </main>
    </div>
  );
};

export default HomePage;
