const axios = require('axios');
const { Dog, Temperament } = require('./../../src/db');
const { cleanApi } = require('../utils/utils');

//.env
require('dotenv').config();
const { API_KEY } = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiDogs = async () => {
    try {
        const response = await axios.get(URL);
        return cleanApi(response.data);
    } catch (error) {
        console.log(`Error al obtener datos de la API: ${error.message}`);
        return [];
    }
};

const getAllDogs = async () => {
    const dbDog = await Dog.findAll({
        // include: {
        //     model: Temperament,
        //     as: 'temperament',
        //     attributes: ["id","name"],
        //     through: {
        //         attributes: [],
        //     },
        // },
        // order: [
        //     ['name', 'ASC']
        // ],
    });

    const [apiDog] = await Promise.all([
        getApiDogs()
    ]);

    return [...dbDog, ...apiDog];
};

module.exports = {
    getApiDogs,
    getAllDogs,
}