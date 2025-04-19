"use client";

import {
  BookOpen,
  Boxes,
  Building,
  Building2,
  FileSpreadsheet,
  FileText,
  Phone,
  Ruler,
  ShoppingCart,
  Tag,
  Truck,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";

// Define the catalog structure with subcatalogs
interface Subcatalog {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface CatalogModule {
  id: string;
  name: string;
  icon: React.ElementType;
  subcatalogs?: Subcatalog[];
}

const modules: CatalogModule[] = [
  {
    id: "products",
    name: "Products",
    icon: ShoppingCart,
    subcatalogs: [
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
    ],
  },
  {
    id: "suppliers",
    name: "Suppliers",
    icon: Truck,
    subcatalogs: [
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
    ],
  },
  {
    id: "customers",
    name: "Customers",
    icon: Users,
    subcatalogs: [
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
    ],
  },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    subcatalogs: [
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
    ],
  },
  {
    id: "organizations",
    name: "Organizations",
    icon: Building,
    subcatalogs: [
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
    ],
  },
];
export const useSidebar = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedSubcatalog, setSelectedSubcatalog] = useState<string | null>(
    null
  );
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    products: false,
    suppliers: false,
    customers: false,
    documents: false,
    organizations: false,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleModuleSelect = (
    moduleId: string,
    subcatalogId: string | null = null
  ) => {
    setSelectedModule(moduleId);

    // If a subcatalog is provided, set it
    if (subcatalogId) {
      setSelectedSubcatalog(subcatalogId);
    } else {
      // Otherwise, set the first subcatalog of the module
      const module = modules.find((m) => m.id === moduleId);
      if (module?.subcatalogs?.length) {
        setSelectedSubcatalog(module.subcatalogs[0].id);
      } else {
        setSelectedSubcatalog(null);
      }
    }

    // Open the group if it's not already open
    if (!openGroups[moduleId]) {
      toggleGroup(moduleId);
    }
  };
  return {
    modules,
    selectedModule,
    selectedSubcatalog,
    handleModuleSelect,
    openGroups,
    toggleGroup,
  };
};
