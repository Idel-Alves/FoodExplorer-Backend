const { Router} = require("express");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const CartsController = require("");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.use(ensureAuthenticated);

cartsRoutes.post('/', cartsController.create);

module.exports = cartsRoutes;