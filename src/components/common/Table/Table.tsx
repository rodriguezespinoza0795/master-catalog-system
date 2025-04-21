import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "./TableActions";

export default async function TableComponent({
  headers,
  data,
  name,
}: {
  headers: string[];
  data: any[];
  name: string;
}) {
  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              {/* Render different columns based on the subcatalog */}
              {name === "products-list" && (
                <>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active"
                          ? "default"
                          : item.status === "Low Stock"
                          ? "secondary"
                          : item.status === "Discontinued" ||
                            item.status === "Inactive"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </>
              )}

              {name === "product-sizes" && (
                <>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              {name === "product-categories" && (
                <>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              {name === "suppliers-list" && (
                <>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </>
              )}

              {name === "supplier-types" && (
                <>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              {name === "customers-list" && (
                <>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.contact}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </>
              )}

              {(name === "customer-segments" || name === "contact-methods") && (
                <>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              {name === "documents-list" && (
                <>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                </>
              )}

              {name === "document-types" && (
                <>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              {name === "organizations-list" && (
                <>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.manager}</TableCell>
                  <TableCell>{item.employees}</TableCell>
                </>
              )}

              {name === "departments" && (
                <>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                </>
              )}

              <TableCell>
                <TableActions name={name} item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
