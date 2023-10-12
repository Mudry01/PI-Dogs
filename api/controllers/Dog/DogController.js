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

const getBddDogs = async () => {
    try {
        const dbDog = await Dog.findAll({
            include: {
                model: Temperament,
                through: {
                    atributes: ['name'],
                }
            },
        });
        return cleanApi(dbDog);
    } catch (error) {
        console.error("getDbData: ", error.message)
        throw new Error(error.message)

    };
};

const getAllDogs = async () => {
    const dbDog = await getBddDogs();
    const apiDog = await getApiDogs();

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
    const allDogsApi = await getApiDogs();
    const allDogsBdd = await getBddDogs();
    const allDogs = [...allDogsApi, ...allDogsBdd];
    if (name) {
        const filteredDogs = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
        return filteredDogs;
    } else throw new Error('No se encontró un perro con el nombre especificado');
};

const createDog = async ({
    name,
    temperament,
    image,
    life_span_min,
    life_span_max,
    height_min,
    height_max,
    weight_min,
}) => {
    try {
        name = name.charAt(0).toUpperCase() + name.slice(1)

        const newDog = await Dog.creat({
            name,
            temperament,
            image,
            life_span_min,
            life_span_max,
            height_min,
            height_max,
            weight_min,
        });
        const temp = Temperament.findAll({
            where: { name: temperament },
        });

        await newDog.addTemperament(temp);

        return newDog;
    } catch (error) {
        console.error('Error al crear el videojuego:', error.message);
        throw error;
    }
};

module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName,
    createDog
}