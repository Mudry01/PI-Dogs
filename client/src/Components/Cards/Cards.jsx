import { Link } from "react-router-dom"

const Card = (props) => {
    return (
        <Link>
        <div>
            <p>{props.name}</p>
            <img src={props.image} alt={props.name} />
            <p>Height: {props.height_min} a {props.height_max}</p>
            <p>Weight: {props.weight_min} a {props.weight_max}</p>
            <p>Life Span: {props.life_span_min} a {props.life_span_max}</p>
            <p>Temperament: {props.temperament}</p>
        </div>
        </Link>
    );
};

export default Card;