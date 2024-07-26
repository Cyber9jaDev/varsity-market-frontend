import React from 'react';
import './styles/pagination.scss';
import { useAppContext } from '../contexts/AppContext';


const Pagination = ( { setValues, totalPages, page } ) => {
  const { isLoading }= useAppContext();

  const handleNextPage = () => {
    if (page >= totalPages) return;
    setValues(current => ({ ...current, page: page + 1 } ))
  };

  const handlePrevPage = () => {
    if (page <= 1) return;
    setValues(current => ({ ...current, page: page -1 } ));
  };

  return (
    <>
      { !isLoading && totalPages > 1 && <section id='pagination'>
        <nav aria-label="navigation">
          <ul className="pagination"> 
            <li><i onClick={handlePrevPage} className="fa fa-solid fa-chevron-left"></i></li>
            <li><span>{page} / {totalPages}</span></li>
            <li><i onClick={handleNextPage} className="fa fa-solid fa-chevron-right"></i></li>
          </ul>
        </nav>
      </section>
      }
    </>
  );
}

export default Pagination;

