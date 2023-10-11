const {
    getAllDogs,
    getDogsById,
    getDogsByName
} = require('./../../controllers/Dog/DogController');

const getDogsHandler = async (req, res) => {
    try {
        const results = await getAllDogs();
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

const getDogsByNameHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const dogs = await getDogsByName(name);
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    getDogsByNameHandler
}