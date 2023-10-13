const {Router} = require('express');
const DogRouter = Router();
const {
    getDogsHandler,
    getDogsByIdHandler,
    getDogsByRazaHandler,
    postDog,
} = require('./../../handlers/Dog/DogHandler');

//---------GET---------//
DogRouter.get("/", getDogsHandler); //----Get all and Get by name----//
//---------GET BREEDS---------//
DogRouter.get("/breeds", getDogsByRazaHandler);
DogRouter.get("/:id", getDogsByIdHandler);
//---------POST---------//
DogRouter.post("/create", postDog);


module.exports = DogRouter;