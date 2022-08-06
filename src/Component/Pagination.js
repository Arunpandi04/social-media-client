import React, { useEffect, useState, useMemo } from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = (props) => {
    const [totalPages, setTotalPages] = useState(0);
    

    useEffect(() => {
        if (props.total > 0 && props.itemsPerPage > 0)
          setTotalPages(Math.ceil(props.total / props.itemsPerPage));
      }, [props.total,props.itemsPerPage]);


      const paginationItems = useMemo(() => {
        const pages = [];
    
        for (let i = 1; i <= totalPages; i++) {
          pages.push(
            <Pagination.Item
              key={i}
              active={i === props.currentPage}
              onClick={() => props.onPageChange(i)}
            >
              {i}
            </Pagination.Item>
          );
        }
    
        return pages;
      }, [totalPages, props.currentPage]);

      if (totalPages === 0) return null;

    return (
        <Pagination className="paginationInfo">  
          <Pagination.Prev
            onClick={() => props.onPageChange(props.currentPage - 1)}
            disabled={props.currentPage === 1}
          />
          {paginationItems}
          <Pagination.Next
            onClick={() => props.onPageChange(props.currentPage + 1)}
            disabled={props.currentPage === totalPages}
          />
        </Pagination>
    );
}

export default PaginationComponent;