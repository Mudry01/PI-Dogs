import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogsById } from "../../Redux/Actions";
import normalizeDataID from "../../Utils/UtilsData";

const DetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogsDetail);

    useEffect(() => {
        dispatch(getDogsById(id));
    }, [dispatch, id]);

    const normalizedDog = normalizeDataID(dog);

    return (
        <div>
            <h1>INFORMACION</h1>
            <div>
                <h2>{normalizedDog.name}</h2>
                <img src={normalizedDog.image} alt={normalizedDog.name} />
            </div>
            <div>
                <p>HEIGHT: {normalizedDog.height_min} - {normalizedDog.height_max} Centimeters</p>
                <p>WEIGHT: {normalizedDog.weight_min} - {normalizedDog.weight_max} Kilograms</p>
                <p>LIFE SPAN: {normalizedDog.life_span_min} - {normalizedDog.life_span_max} Years</p>
            </div>
            <h3>TEMPERAMENTS: {normalizedDog.temperament}</h3>
        </div>
    );
};

export default DetailPage;
