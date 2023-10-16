import { useSelector} from "react-redux";
import Cards from "../Cards/Cards";

const CardsContainer = () => {
    const dogs = useSelector((state) => state.dogs);

    return (
        <div>
            {dogs.map((dog) => (
                <Cards
                key={dog.id}
                id={dog.id}
                image={dog.image}
                name={dog.name}
                height_min={dog.height_min}
                height_max={dog.height_max}
                weight_min={dog.weight_min}
                weight_max={dog.weight_max}
                life_span_min={dog.life_span_min}
                life_span_max={dog.life_span_max}
                temperament={dog.temperament}
                />
            ))}
        </div>
    )

}

export default CardsContainer;