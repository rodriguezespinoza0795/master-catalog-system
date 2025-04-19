"use client";

import { Table } from "@/components/common/Table";
import PageHeader from "@/components/common/Table/PageHeader";
import Pagination from "@/components/common/Table/Pagination";
import Toolbar from "@/components/common/Table/Toolbar";
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
import { useParams } from "next/navigation";

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

const getModuleData = (subcatalogId: string | null = null) => {
  // Mock data for each module and subcatalog
  const data: Record<string, any[]> = {
    "products-list": [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        status: "Active",
        stock: 145,
        price: "$89.99",
      },
      {
        id: 2,
        name: "Ergonomic Chair",
        category: "Furniture",
        status: "Active",
        stock: 32,
        price: "$249.99",
      },
      {
        id: 3,
        name: "Smart Watch",
        category: "Electronics",
        status: "Low Stock",
        stock: 8,
        price: "$199.99",
      },
      {
        id: 4,
        name: "Laptop Stand",
        category: "Accessories",
        status: "Active",
        stock: 67,
        price: "$34.99",
      },
      {
        id: 5,
        name: "Coffee Maker",
        category: "Appliances",
        status: "Discontinued",
        stock: 0,
        price: "$79.99",
      },
    ],
    "product-sizes": [
      {
        id: 1,
        name: "Small",
        code: "S",
        status: "Active",
        description: "Small size",
      },
      {
        id: 2,
        name: "Medium",
        code: "M",
        status: "Active",
        description: "Medium size",
      },
      {
        id: 3,
        name: "Large",
        code: "L",
        status: "Active",
        description: "Large size",
      },
      {
        id: 4,
        name: "Extra Large",
        code: "XL",
        status: "Active",
        description: "Extra large size",
      },
      {
        id: 5,
        name: "XXL",
        code: "XXL",
        status: "Active",
        description: "Double extra large size",
      },
    ],
    "product-categories": [
      {
        id: 1,
        name: "Electronics",
        status: "Active",
        description: "Electronic devices and accessories",
      },
      {
        id: 2,
        name: "Furniture",
        status: "Active",
        description: "Home and office furniture",
      },
      {
        id: 3,
        name: "Accessories",
        status: "Active",
        description: "Various accessories for products",
      },
      {
        id: 4,
        name: "Appliances",
        status: "Active",
        description: "Home and kitchen appliances",
      },
      {
        id: 5,
        name: "Clothing",
        status: "Active",
        description: "Apparel and fashion items",
      },
    ],
    "suppliers-list": [
      {
        id: 1,
        name: "Global Electronics",
        category: "Electronics",
        status: "Active",
        contact: "John Smith",
        location: "New York, USA",
      },
      {
        id: 2,
        name: "Furniture Plus",
        category: "Furniture",
        status: "Active",
        contact: "Sarah Johnson",
        location: "Chicago, USA",
      },
    ],
    "supplier-types": [
      {
        id: 1,
        name: "Manufacturer",
        status: "Active",
        description: "Creates and produces products",
      },
      {
        id: 2,
        name: "Distributor",
        status: "Active",
        description: "Distributes products to retailers",
      },
      {
        id: 3,
        name: "Wholesaler",
        status: "Active",
        description: "Sells products in bulk",
      },
    ],
    "customers-list": [
      {
        id: 1,
        name: "Acme Corporation",
        category: "Enterprise",
        status: "Active",
        contact: "John Doe",
        location: "New York, USA",
      },
      {
        id: 2,
        name: "Globex Inc",
        category: "Enterprise",
        status: "Active",
        contact: "Jane Smith",
        location: "London, UK",
      },
    ],
    "customer-segments": [
      {
        id: 1,
        name: "Enterprise",
        status: "Active",
        description: "Large enterprise customers",
      },
      {
        id: 2,
        name: "SMB",
        status: "Active",
        description: "Small and medium businesses",
      },
      {
        id: 3,
        name: "Individual",
        status: "Active",
        description: "Individual consumers",
      },
    ],
    "contact-methods": [
      {
        id: 1,
        name: "Email",
        status: "Active",
        description: "Contact via email",
      },
      {
        id: 2,
        name: "Phone",
        status: "Active",
        description: "Contact via phone",
      },
      {
        id: 3,
        name: "Mail",
        status: "Active",
        description: "Contact via postal mail",
      },
    ],
    "documents-list": [
      {
        id: 1,
        name: "Invoice Template",
        category: "Finance",
        status: "Active",
        version: "2.1",
        lastUpdated: "2023-05-15",
      },
      {
        id: 2,
        name: "Employee Contract",
        category: "HR",
        status: "Active",
        version: "1.3",
        lastUpdated: "2023-06-22",
      },
    ],
    "document-types": [
      {
        id: 1,
        name: "Invoice",
        status: "Active",
        description: "Billing documents",
      },
      {
        id: 2,
        name: "Contract",
        status: "Active",
        description: "Legal agreements",
      },
      {
        id: 3,
        name: "Report",
        status: "Active",
        description: "Business reports",
      },
    ],
    "organizations-list": [
      {
        id: 1,
        name: "Marketing Department",
        category: "Department",
        status: "Active",
        manager: "Sarah Johnson",
        employees: 24,
      },
      {
        id: 2,
        name: "Engineering Team",
        category: "Team",
        status: "Active",
        manager: "Michael Chen",
        employees: 42,
      },
    ],
    departments: [
      {
        id: 1,
        name: "Marketing",
        status: "Active",
        description: "Marketing department",
      },
      {
        id: 2,
        name: "Engineering",
        status: "Active",
        description: "Engineering department",
      },
      {
        id: 3,
        name: "Finance",
        status: "Active",
        description: "Finance department",
      },
    ],
  };

  if (!subcatalogId) return [];
  return data[subcatalogId as keyof typeof data];
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

const HomePage = () => {
  const params = useParams();

  const data = getModuleData(params?.table as string);
  const headers = getTableHeaders(params?.table as string);
  const moduleInfo = modules.find((m) => m.id === (params?.module as string));
  const ModuleIcon = moduleInfo?.icon || moduleInfo?.icon || Database;
  const title = moduleInfo?.name || moduleInfo?.name || "Catalog";

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      <main className="flex flex-col  overflow-auto px-4 md:px-6 h-full py-10 gap-10">
        <PageHeader title={title} icon={<ModuleIcon className="h-5 w-5" />} />
        <Toolbar title={title} name={params?.table as string} />
        <Table headers={headers} data={data} name={params?.table as string} />
        <Pagination totalItems={data.length} />
      </main>
    </div>
  );
};

export default HomePage;
