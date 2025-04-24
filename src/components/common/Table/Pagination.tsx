"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return page === "..." ? (
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  ) : (
    <PaginationItem>
      <PaginationLink href={href} isActive={isActive}>
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}

const PaginationComponent = ({
  totalPages,
  totalItems,
}: {
  totalPages: number;
  totalItems: number;
}) => {
  const ITEMS_PER_PAGE = 5;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);
  const startIndex =
    allPages.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE - 1, totalItems);

  return (
    <Pagination className="flex flex-col sm:flex-row justify-between gap-4 items-center">
      <div className="text-sm text-muted-foreground">
        Showing <strong>{startIndex}</strong> to <strong>{endIndex}</strong> of{" "}
        <strong>{totalItems}</strong> entries
      </div>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={createPageURL(currentPage - 1)} />
        </PaginationItem>
        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            return (
              <PaginationNumber
                key={`${page}-${index}`}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === page}
              />
            );
          })}
        </div>
        <PaginationItem>
          <PaginationNext href={createPageURL(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
