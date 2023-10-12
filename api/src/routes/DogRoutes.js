const {Router} = require('express');
const DogRouter = Router();
const {
    getDogsHandler,
    getDogsByIdHandler,
    postDog,
} = require('./../../handlers/Dog/DogHandler');

//---------GET---------//
DogRouter.get("/", getDogsHandler); //----Get all and Get by name----//
DogRouter.get("/:id", getDogsByIdHandler);
//---------POST---------//
DogRouter.post("/create", postDog);


module.exports = DogRouter;