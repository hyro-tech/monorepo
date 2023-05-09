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
  border: 1px solid ${(props) => (props.active ? 'black' : theme.colors.grayBorder)};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  background: none;
  cursor: pointer;
  margin: 0 5px;
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const showPages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (pageNumber) => pageNumber >= 0 && pageNumber < totalPages,
  );

  const goToFirstPage = () => {
    onPageChange(0);
  };

  const goToLastPage = () => {
    onPageChange(totalPages - 1);
  };

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

  return (
    <PaginationWrapper>
      <PageButton onClick={goToFirstPage}>&lt;&lt;</PageButton>
      <PageButton onClick={goToPreviousPage}>&lt;</PageButton>
      {showPages.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber + 1}
        </PageButton>
      ))}
      <PageButton onClick={goToNextPage}>&gt;</PageButton>
      <PageButton onClick={goToLastPage}>&gt;&gt;</PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
