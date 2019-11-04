import React from 'react';
import ReactPaginate from 'react-paginate';
import "./paginationstyle.css";

const Pagination = ({bookpages,handlePageClick}) => {
  return (
  <div>
     <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={bookpages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages_pagination'}
          activeClassName={'active'}
       />	
	</div>
  );
};

export default Pagination;
