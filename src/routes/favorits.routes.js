const { Router } = require("express");

const FavoritsController = require("../controllers/FavoritsController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const faroritsRoutes = Router();

const favoritsController = new FavoritsController();

faroritsRoutes.use(ensureAuthenticated);

faroritsRoutes.post("/:dish_id", favoritsController.create);
faroritsRoutes.get("/:id", favoritsController.show);
faroritsRoutes.delete("/:id", favoritsController.delete);

module.exports = faroritsRoutes;