import { Link } from "react-router-dom"

const Card = (props) => {
    return (
        <Link to={`/detail/${props.id}`}>
        <div>
            <p>{props.name}</p>
            <img src={props.image} alt={props.name} />
            <p>Weight: {props.weight_min} a {props.weight_max}</p>
            <p>Temperament: {props.temperament}</p>
        </div>
        </Link>
    );
};

export default Card;