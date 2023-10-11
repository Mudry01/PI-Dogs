const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./DogRoutes');
// const TemperamentRouter = require('./TemperamentRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogRouter);
// router.use('/temperament', TemperamentRouter);

module.exports = router;
