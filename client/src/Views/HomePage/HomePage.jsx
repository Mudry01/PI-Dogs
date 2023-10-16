import { useDispatch } from "react-redux";
import CardsContainer from "../../Components/CardContainer/CardsContainer";
import { getAllDogs } from "../../Redux/Actions";
import { useEffect } from "react";

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDogs());
    }, [dispatch]);
    
    return (
        <div>
            <h1>DOGMANIA</h1>
            <CardsContainer/>
        </div>
    );
}

export default HomePage;