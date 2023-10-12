const {
    getAllTemp
} = require('./../../controllers/Temperament/TemperamentController');

const getAllTempHandler = async (req, res) => {
    try{
         const result = await getAllTemp();
         res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllTempHandler,
}