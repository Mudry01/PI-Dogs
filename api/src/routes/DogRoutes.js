const {Router} = require('express');
const DogRouter = Router();
const {
    getDogsHandler,
    getDogsByIdHandler,
    getDogsByRazaHandler,
    postDog,
    deleteDogHandler
} = require('./../../handlers/Dog/DogHandler');

//---------GET---------//
DogRouter.get("/", getDogsHandler); //----Get all and Get by name----//
//---------GET BREEDS---------//
DogRouter.get("/breeds", getDogsByRazaHandler);
DogRouter.get("/:id", getDogsByIdHandler);
//---------POST---------//
DogRouter.post("/create", postDog);
//---------DELETE--------//
DogRouter.delete("/delete/:id", deleteDogHandler);

module.exports = DogRouter;