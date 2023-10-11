const axios = require('axios');
const { Dog, Temperament } = require('./../../src/db');
const { cleanApi, cleanApiById } = require('../utils/utils');

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

const getDogsById = async (id, source) => {
    if (source === "api") {
        const allDogs = await getApiDogs();
        const filteredDog = allDogs.find(dog => dog.id === parseInt(id));

        if (filteredDog) return filteredDog;
        else throw new Error('No se encontró un perro con el ID especificado');

    } else if (source === "bdd") {
        const dog = await Dog.findByPk(id);
        if (dog) {
            return dog;
        } else {
            throw new Error('No se encontró un perro con el ID especificado en la base de datos');
        }
    } else {
        throw new Error('Fuente no válida');
    }
};

const getDogsByName = async (name) => {
    // Obtener los datos de la API
    const allDogs = await getApiDogs();
  
    // Filtrar los perros cuyos nombres coinciden con el nombre de búsqueda (insensible a mayúsculas y minúsculas)
    const filteredDogs = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
  
    if (filteredDogs.length > 0) {
      return filteredDogs;
    } else {
      throw new Error('No se encontró un perro con el nombre especificado');
    }
  };
  
  

module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName
}