import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchSkeleton from "../SearchSkeleton";

const Paginations = ({ data, handlePage }) => {
  if (!data) {
    return <SearchSkeleton />;
  }
  const { page: currPage, pages: totalPages } = data;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currPage === 1}
              className={currPage === 1 ? "pointer-events-none opacity-50" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (currPage - 1 >= 1) {
                  handlePage(currPage - 1);
                }
              }}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currPage}
                aria-disabled={!data.pages || data.pages === 0}
                className={!data.pages || data.pages === 0 ? "pointer-events-none opacity-50" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currPage === totalPages}
              className={
                currPage === totalPages || !data.pages || data.pages === 0 ? "pointer-events-none opacity-50" : ""
              }
              onClick={(e) => {
                e.preventDefault();
                if (currPage + 1 <= totalPages) {
                  handlePage(currPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
