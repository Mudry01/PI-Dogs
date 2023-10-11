const {Router} = require('express');
const DogRouter = Router();
const {
    getDogsHandler
} = require('./../../handlers/Dog/DogHandler');

DogRouter.get("/", getDogsHandler);

module.exports = DogRouter;