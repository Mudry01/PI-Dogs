import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardsContainer from "../../Components/CardContainer/CardsContainer";
import { getAllDogs, filterFromBdd, filterFromApi, filterShowAll } from "../../Redux/Actions"; // Importa las acciones de filtrado

const HomePage = () => {
    const dispatch = useDispatch();
    const dogsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState("all"); // Agrega un estado para el tipo de filtro

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);

    const allDogs = useSelector((state) => state.dogs);

    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;

    const filteredDogs = filterType === "all" ? allDogs : filterType === "createdFromBdd" ? allDogs.filter(dog => dog.createdInBd === true) : allDogs.filter(dog => dog.createdInBd === false);

    const dogsToShow = filteredDogs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        if (type === "createdFromBdd") {
            dispatch(filterFromBdd());
        } else if (type === "createdFromApi") {
            dispatch(filterFromApi());
        } else {
            dispatch(filterShowAll());
        }
    };

    return (
        <div>
            <h1>DOGMANIA</h1>
            <button onClick={() => handleFilterChange("all")}>Mostrar Todos</button>
            <button onClick={() => handleFilterChange("createdFromBdd")}>BDD</button>
            <button onClick={() => handleFilterChange("createdFromApi")}>API</button>
            <CardsContainer dogs={dogsToShow} />
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
            </div>
        </div>
    );
};

export default HomePage;

