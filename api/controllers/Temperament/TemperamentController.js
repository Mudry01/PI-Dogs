const axios = require('axios');
const { Temperament } = require('./../../src/db');
const { getAllDogs } = require('./../Dog/DogController');

//.env

const getAllTemp = async () => {
    try {
        const allDogs = await getAllDogs();

        const uniqueTemperamentsSet = new Set(
            allDogs
                .map((dog) => dog.temperament)
                .filter((temp) => temp)
                .flatMap((temp) => temp.split(',').map((t) => t.trim()))
        );

        const uniqueTemperaments = [...uniqueTemperamentsSet];

        if (uniqueTemperaments.length > 0) {
            const tempBdd = await Temperament.bulkCreate(uniqueTemperaments.map((name) => ({ name })));
            return tempBdd;
        } else {
            console.log('No se encontraron temperamentos únicos para insertar en la base de datos.');
            return [];
        }
    } catch (error) {
        console.error('Error al traer los datos:', error.message);
        throw error;
    }
};


module.exports = {
    getAllTemp,
}