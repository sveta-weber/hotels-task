import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import { StyledContainer } from "./style";

const Pagination: FC<{
  page?: number;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}> = ({ page, pageCount = 1, onPageChange }) => {
  return (
    <StyledContainer>
      <ReactPaginate
        forcePage={page ? page - 1 : undefined}
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={(selectedItem) => {
          onPageChange && onPageChange(selectedItem.selected + 1);
        }}
        containerClassName="pagination"
        activeClassName="pagination__page_active"
        pageClassName="pagination__page"
        activeLinkClassName="pagination__page-link_active"
        pageLinkClassName="pagination__page-link"
        previousClassName="pagination__page"
        previousLinkClassName="pagination__page-link"
        nextClassName="pagination__page"
        nextLinkClassName="pagination__page-link"
        breakClassName="pagination__break"
        disabledClassName="pagination__disabled"
      />
    </StyledContainer>
  );
};

export default Pagination;
