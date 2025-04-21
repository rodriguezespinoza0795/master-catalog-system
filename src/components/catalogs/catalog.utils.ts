export interface CatalogConfig {
  title: string;
  create: {
    name: string;
    label: string;
    type: string;
  }[];
  dbTableName: string;
  route: string;
}

export const getCatalogConfig = (table: string): CatalogConfig => {
  const modules: Record<string, CatalogConfig> = {
    "products-list": {
      title: "Product",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "stock", label: "Stock", type: "number" },
        { name: "price", label: "Price", type: "decimal" },
      ],
      dbTableName: "products",
      route: "products-list",
    },
    "product-sizes": {
      title: "Product Size",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "code", label: "Code", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "product_sizes",
      route: "product-sizes",
    },
    "product-categories": {
      title: "Product Category",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "product_categories",
      route: "product-categories",
    },
    "suppliers-list": {
      title: "Supplier",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "contact", label: "Contact", type: "text" },
        { name: "location", label: "Location", type: "text" },
      ],
      dbTableName: "suppliers",
      route: "suppliers-list",
    },
    "supplier-types": {
      title: "Supplier Type",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "supplier_types",
      route: "supplier-types",
    },
    "customers-list": {
      title: "Customer",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "contact", label: "Contact", type: "text" },
        { name: "location", label: "Location", type: "text" },
      ],
      dbTableName: "customers",
      route: "customers-list",
    },
    "customer-segments": {
      title: "Customer Segment",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "customer_segments",
      route: "customer-segments",
    },
    "contact-methods": {
      title: "Contact Method",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "contact_methods",
      route: "contact-methods",
    },
    "documents-list": {
      title: "Document",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "version", label: "Version", type: "decimal" },
      ],
      dbTableName: "documents",
      route: "documents-list",
    },
    "document-types": {
      title: "Document Type",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "document_types",
      route: "document-types",
    },
    "organizations-list": {
      title: "Organization",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "manager", label: "Manager", type: "text" },
        { name: "employees", label: "Employees", type: "number" },
      ],
      dbTableName: "organizations",
      route: "organizations-list",
    },
    departments: {
      title: "Department",
      create: [
        { name: "name", label: "Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
      ],
      dbTableName: "departments",
      route: "departments",
    },
  };

  return modules[table];
};
