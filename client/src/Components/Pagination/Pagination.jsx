import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  dogsPerPage,
  filteredDogs,
}) => {
  const startIndex = (currentPage - 1) * dogsPerPage;
  const endIndex = startIndex + dogsPerPage;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
      <span>Página {currentPage} de {totalPages}</span>
      <button onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
    </div>
  );
};

export default Pagination;