export const normalizeData = (data) => {
    return data.map((dog) => {
        const temperament = dog.temperaments
            ? dog.temperaments.map((t) => t.name).join(', ')
            : dog.temperament;

        return {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height_min: dog.height_min,
            height_max: dog.height_max,
            weight_min: dog.weight_min,
            weight_max: dog.weight_max,
            life_span_min: dog.life_span_min,
            life_span_max: dog.life_span_max,
            temperament: temperament,
        };
    });
};

function normalizeDataID(data) {
    if (data.createdInBd) {
        // Si el perro proviene de la base de datos
        return {
            id: data.id,
            name: data.name,
            image: data.image,
            height_min: data.height_min,
            height_max: data.height_max,
            weight_min: data.weight_min,
            weight_max: data.weight_max,
            life_span_min: data.life_span_min,
            life_span_max: data.life_span_max,
            temperament: data.temperaments.map((temperament) => temperament.name).join(', '),
        };
    } else {
        // Si el perro proviene de la API
        return {
            id: data.id,
            name: data.name,
            image: data.image,
            height_min: data.height_min,
            height_max: data.height_max,
            weight_min: data.weight_min,
            weight_max: data.weight_max,
            life_span_min: data.life_span_min,
            life_span_max: data.life_span_max,
            temperament: data.temperament,
        };
    }
}

export default normalizeDataID;

