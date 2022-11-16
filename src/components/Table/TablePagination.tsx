import React from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

interface TablePagination {
  totalCount: number;
  handlePageClick(selectedItem: { selected: number }): void;
  page: number;
}

const TablePagination = ({ totalCount, handlePageClick, page }: TablePagination) => {
  return (
    <TablePaginationContainer className="flex justify-center">
      <ReactPaginate
        pageCount={totalCount}
        onPageChange={handlePageClick}
        forcePage={page - 1}
        pageRangeDisplayed={1}
        previousLabel={"이전"}
        nextLabel={"다음"}
      />
    </TablePaginationContainer>
  );
};

const TablePaginationContainer = styled.div`
  > ul {
    margin-top: 30px;
    margin-bottom: 10px;
    display: flex;

    & > li {
      border-radius: 0.375rem;
      margin: 0 5px;

      & > a {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 30px;
        padding: 5px;
      }

      &.selected {
        background: #075985;
        color: #f5f5f4;
      }

      &:hover {
        background: #075985;
        color: #f5f5f4;
      }
    }
  }
`;

export default TablePagination;
