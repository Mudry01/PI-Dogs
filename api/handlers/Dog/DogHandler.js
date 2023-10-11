const {
    getApiDogs,
    getAllDogs,
} = require('./../../controllers/Dog/DogController');

const getDogsHandler = async (req, res) => {
    try {
        const results = await getAllDogs();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getDogsHandler,
}