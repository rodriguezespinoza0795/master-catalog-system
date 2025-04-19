import { Table } from "@/components/common/Table";
import PageHeader from "@/components/common/Table/PageHeader";
import Pagination from "@/components/common/Table/Pagination";
import Toolbar from "@/components/common/Table/Toolbar";
import { fetchData } from "@/lib/data";
import {
  BookOpen,
  Boxes,
  Building,
  Building2,
  Database,
  FileSpreadsheet,
  Phone,
  Ruler,
  Tag,
  UserCircle,
} from "lucide-react";

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

interface CatalogModule {
  id: string;
  name: string;
  icon: React.ElementType;
}

const modules: CatalogModule[] = [
  {
    id: "products-list",
    name: "Products",
    icon: Boxes,
  },
  {
    id: "product-sizes",
    name: "Sizes",
    icon: Ruler,
  },
  {
    id: "product-categories",
    name: "Categories",
    icon: Tag,
  },

  {
    id: "suppliers-list",
    name: "Suppliers",
    icon: Building2,
  },
  {
    id: "supplier-types",
    name: "Types",
    icon: FileSpreadsheet,
  },

  {
    id: "customers-list",
    name: "Customers",
    icon: UserCircle,
  },
  {
    id: "customer-segments",
    name: "Segments",
    icon: Tag,
  },
  {
    id: "contact-methods",
    name: "Contact Methods",
    icon: Phone,
  },

  {
    id: "documents-list",
    name: "Documents",
    icon: BookOpen,
  },
  {
    id: "document-types",
    name: "Types",
    icon: FileSpreadsheet,
  },

  {
    id: "organizations-list",
    name: "Organizations",
    icon: Building,
  },
  {
    id: "departments",
    name: "Departments",
    icon: Building2,
  },
];

const HomePage = async (props: {
  params: Promise<{
    table?: string;
    module?: string;
  }>;
}) => {
  const dbTableName = {
    "products-list": "products",
    "product-sizes": "product_sizes",
    "product-categories": "product_categories",
    "suppliers-list": "suppliers",
    "supplier-types": "supplier_types",
    "customers-list": "customers",
    "customer-segments": "customer_segments",
    "contact-methods": "contact_methods",
    "documents-list": "documents",
    "document-types": "document_types",
    "organizations-list": "organizations",
    departments: "departments",
  };
  const params = await props.params;
  let dbData = null;
  if (
    [
      "products-list",
      "product-sizes",
      "product-categories",
      "suppliers-list",
      "supplier-types",
      "customers-list",
      "customer-segments",
      "contact-methods",
      "documents-list",
      "document-types",
      "organizations-list",
      "departments",
    ].includes(params?.table as string)
  ) {
    dbData = await fetchData(
      dbTableName[params?.table as keyof typeof dbTableName]
    );
  }

  const headers = getTableHeaders(params?.table as string);
  const moduleInfo = modules.find((m) => m.id === (params?.module as string));
  const ModuleIcon = moduleInfo?.icon || moduleInfo?.icon || Database;
  const title = moduleInfo?.name || moduleInfo?.name || "Catalog";

  const rows = dbData ? dbData : [];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <main className="flex flex-col  overflow-auto px-4 md:px-6 h-full py-10 gap-10">
        <PageHeader title={title} icon={<ModuleIcon className="h-5 w-5" />} />
        <Toolbar title={title} name={params?.table as string} />
        <Table headers={headers} data={rows} name={params?.table as string} />
        <Pagination totalItems={rows.length} />
      </main>
    </div>
  );
};

export default HomePage;
