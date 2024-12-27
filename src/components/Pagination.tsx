import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageClick,
}) => {
  return (
    <nav className='d-flex justify-content-center'>
      <ul className='pagination'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className='page-link navigation-button'
            onClick={() => onPageClick(currentPage - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            key={index}>
            <button
              className='page-link'
              onClick={() => onPageClick(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}>
          <button
            className='page-link navigation-button'
            onClick={() => onPageClick(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
