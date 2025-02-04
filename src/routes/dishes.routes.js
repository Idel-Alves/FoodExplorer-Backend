const { Router } = require("express");
const multer = require("multer");
const multerConfig = require("../configs/upload");

const DishesController = require("../controllers/dishesController");
const DishImageUpdateController = require("../controllers/DishImageUpdateController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const ensureUserIsAdmin = require("../middleware/ensureUserIsAdmin");

const dishesController = new DishesController();
const dishImageUpdateController = new DishImageUpdateController();

const dishesRoutes = Router();
const upload = multer(multerConfig.MULTER);

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.post("/", ensureUserIsAdmin, upload.single("image"), dishesController.create);
dishesRoutes.put("/:id", ensureUserIsAdmin, dishesController.update);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.delete("/:id", ensureUserIsAdmin, dishesController.delete); 
dishesRoutes.patch('/:id', ensureUserIsAdmin, upload.single("image"), dishImageUpdateController.update);
module.exports = dishesRoutes;