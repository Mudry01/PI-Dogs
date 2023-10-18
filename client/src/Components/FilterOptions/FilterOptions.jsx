import React from "react";
import { getAllDogs, filterFromBdd, filterFromApi, filterShowAll } from "../../Redux/Actions";

const FilterOptions = ({ onFilterChange, filterFromBdd, filterFromApi, filterShowAll }) => {
  const filterOptions = [
    { label: "Mostrar Todos", value: "all" },
    { label: "BDD", value: "createdFromBdd" },
    { label: "API", value: "createdFromApi" },
  ];


  const handleFilterChange = (filterType) => {
    onFilterChange(filterType);

    // Llama a las funciones de Redux según el filtro seleccionado
    if (filterType === "createdFromBdd") {
      filterFromBdd();
    } else if (filterType === "createdFromApi") {
      filterFromApi();
    } else {
      filterShowAll();
    }
  };

  return (
    <div>
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterOptions;


