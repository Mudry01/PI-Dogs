const axios = require('axios');
const { Dog, Temperament } = require('./../../src/db');
const { cleanApi, cleanBreeds } = require('../utils/utils');

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
                attributes: ['name'],
                through: {
                    atributes: [],
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

const getDogsBreeds = async () => {
    try {
        const response = await axios.get(URL);
        return cleanBreeds(response.data);
    } catch (error) {
        console.log(`Error al obtener datos de la API: ${error.message}`);
        return [];
    }
};

// const getDogsByIdBeeds = async () => {
//     const allDogsApi = await getApiDogs();
//     const allDogsBdd = await getBddDogs();
//     const allDogs = [...allDogsApi, ...allDogsBdd];
// }

const getDogsByName = async (name) => {
    const allDogsApi = await getApiDogs();
    const allDogsBdd = await getBddDogs();
    const allDogs = [...allDogsApi, ...allDogsBdd];
    if (name) {
        const filteredDogs = allDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());
        if (filteredDogs.length > 0) {
            return filteredDogs;
        } else {
            return null;
        }
    } else {
        throw new Error('No se encontró un perro con el nombre especificado');
    }
};


const createDog = async (
    name,
    temperament,
    image,
    life_span_min,
    life_span_max,
    height_min,
    height_max,
    weight_min,
    weight_max
) => {
    try {
        name = name.charAt(0).toUpperCase() + name.slice(1);

        const temperamentsList = temperament.split(',').map((temp) => temp.trim());
        const createdTemperaments = [];

        for (const temp of temperamentsList) {
            let existingTemp = await Temperament.findOne({
                where: { name: temp },
            });

            if (!existingTemp) {
                existingTemp = await Temperament.create({
                    name: temp,
                });
            }
            createdTemperaments.push(existingTemp);
        }
        const newDog = await Dog.create({
            name: name,
            image: image || 'https://dog.ceo/api/breeds/image/random',
            life_span_min: parseInt(life_span_min),
            life_span_max: parseInt(life_span_max),
            height_min: parseInt(height_min),
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            createdInBd: true,
        });

        await newDog.addTemperaments(createdTemperaments);

        return newDog;
    } catch (error) {
        console.error('Error al crear el perro:', error.message);
        throw error;
    }
};

const deleteDog = async (id) => {
    try {
        const deleteDog = await Dog.findByPk(id);
        if (!deleteDog) {
            throw new Error('No se encontró el perro con el ID proporcionado');
        }
        await deleteDog.destroy();

        return 'El perro se eliminó exitosamente.';
    } catch (error) {
        console.error('Error al eliminar el perro:', error.message);
        throw error;
    }
};




module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName,
    createDog,
    getDogsBreeds,
    deleteDog
}