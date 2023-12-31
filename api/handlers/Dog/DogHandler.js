const {
    getAllDogs,
    getDogsById,
    getDogsByName,
    createDog,
    getDogsBreeds,
    deleteDog
} = require('./../../controllers/Dog/DogController');

const getDogsHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const results = name ? await getDogsByName(name) : await getAllDogs();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDogsByIdHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";
    try {
        const dog = await getDogsById(id, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getDogsByRazaHandler = async (req, res) => {
    try {
        const result = await getDogsBreeds();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const postDog = async (req, res) => {
    const {
        name, temperament, image, life_span_min, life_span_max, height_min, height_max, weight_min, weight_max,
    } = req.body;

    console.log('Datos recibidos:', req.body);

    if (typeof name !== 'string' || !name || !height_max || !height_min || !weight_max || !weight_min || !temperament || !life_span_min || !life_span_max) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear un perro.' });
    }

    if (life_span_min > life_span_max || height_min > height_max || weight_min > weight_max) {
        return res.status(400).json({ error: 'Los datos mínimos no pueden ser mayores que los máximos.' });
    }

    if (life_span_min <= 0 || life_span_min > 100 || life_span_max <= 0 || life_span_max > 100 ||
        height_min <= 0 || height_min > 100 || height_max <= 0 || height_max > 100 ||
        weight_min <= 0 || weight_min > 100 || weight_max <= 0 || weight_max > 100) {
        return res.status(400).json({ error: 'Los datos de vida, altura y peso deben estar en un rango válido.' });
    }

    try {
        console.log('Buscando si ya existe el perro:', name);
        const existingDog = await getDogsByName(name);
        if (existingDog) {
            console.log('Perro existente:', existingDog);
            return res.status(400).json({ error: 'El perro ya existe.' });
        }

        const newDog = await createDog(
            name,
            temperament,
            image,
            life_span_min,
            life_span_max,
            height_min,
            height_max,
            weight_min,
            weight_max
        );

        return res.status(201).json(newDog);
    } catch (error) {
        console.error('Error al crear el perro:', error.message);
        return res.status(500).json({ error: 'Hubo un error en la creación del perro.' });
    }
};

const deleteDogHandler = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedDogMessage = await deleteDog(id);
        res.status(200).json({ message: deletedDogMessage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    postDog,
    getDogsByRazaHandler,
    deleteDogHandler
}