const {Router} = require('express');
const TemperamentRouter = Router();
const {
    getAllTempHandler
} = require('./../../handlers/Temperament/TemperamentHanlder');

//---------GET---------//
TemperamentRouter.get("/", getAllTempHandler); //----Get all and Get by name----//

module.exports = TemperamentRouter;