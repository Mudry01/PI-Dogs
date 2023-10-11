const {Router} = require('express');
const DogRouter = Router();
const {
    getDogsHandler,
    getDogsByIdHandler,
    getDogsByNameHandler
} = require('./../../handlers/Dog/DogHandler');

//---------GET---------//
DogRouter.get("/", getDogsHandler);
DogRouter.get("/:id", getDogsByIdHandler);
DogRouter.get("/search", getDogsByNameHandler);

module.exports = DogRouter;