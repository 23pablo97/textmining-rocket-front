import React from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  totalDocuments: number;
  initDocumentCurrentPage: number;
  finalDocumentCurrentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalDocuments,
  initDocumentCurrentPage,
  finalDocumentCurrentPage,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the start and end page numbers to display
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);

  // Adjust startPage and endPage if the total number of pages is less than 5
  if (endPage - startPage < 4) {
    endPage = Math.min(totalPages, 5);
    startPage = Math.max(1, endPage - 4);
  }

  // Generate array of page numbers to display
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
        Showing <span className="font-semibold text-gray-900">{initDocumentCurrentPage}-{finalDocumentCurrentPage}</span> of <span className="font-semibold text-gray-900">{totalDocuments}</span>
      </span>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a onClick={handlePrevPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
            Previous
          </a>
        </li>
        {pageNumbers.map(page => (
          <li key={page}>
            {page === currentPage ? (
              <a aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
                {page}
              </a>
            ) : (
              <a onClick={() => setCurrentPage(page)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                {page}
              </a>
            )}
          </li>
        ))}
        <li>
          <a onClick={handleNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
