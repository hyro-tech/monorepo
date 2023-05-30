import React from 'react';
import styled from 'styled-components';

import theme from '../../styles/theme';
import { deviceMedia, deviceSizes } from '../../styles/helper';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 20px;

  ${deviceMedia[deviceSizes.phone]`
    align-items: center;
    justify-content: center;
  `};
`;

const PageButton = styled.button`
  border: 1px solid ${theme.colors.grayBorder};
  color: ${theme.colors.gray};
  background-color: ${(props) => (props.active ? theme.colors.grayBorder : 'transparent')};
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showPages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (pageNumber) => pageNumber >= 0 && pageNumber < totalPages,
  );

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const goToFirstPage = () => {
    if (currentPage !== 0) {
      onPageChange(0);
    }
  };

  const goToLastPage = () => {
    if (currentPage !== totalPages - 1) {
      onPageChange(totalPages - 1);
    }
  };

  return (
    <PaginationWrapper>
      <PageButton onClick={goToPreviousPage} style={{ marginRight: '10px' }}>
        &lt;
      </PageButton>
      {currentPage > 1 && <PageButton onClick={goToFirstPage}>1</PageButton>}
      {showPages.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {Math.floor(pageNumber + 1)}
        </PageButton>
      ))}
      {currentPage + 1 < totalPages - 1 && (
        <PageButton onClick={goToLastPage}>{Math.floor(totalPages)}</PageButton>
      )}
      <PageButton onClick={goToNextPage} style={{ marginLeft: '10px' }}>
        &gt;
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
