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

const Paginations = ({ data }) => {
  if (!data) {
    return <SearchSkeleton />;
  }
  const {
    limit,
    page: currPage,
    pages: totalPages,
    total: totalCourses,
  } = data;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log("currPage:", currPage, "type:", typeof currPage);
  return (
    <div className="mt-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currPage === 1}
              className={currPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem>
              <PaginationLink href="#" isActive={page === currPage}>
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
                currPage === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
