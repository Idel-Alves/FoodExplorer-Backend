const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageUpdateController {
    async update(request, response) {
       try{
        const { id } = request.params;
        
        let imageFilename = null;
    
        const diskStorage = new DiskStorage();
    
        if (request.file) {
            imageFilename = request.file.filename;
        }
        const dish = await knex("dishes").where({ id }).first();
    
        if (!dish) {
            throw new AppError("Dish não encontrado!");
        }

        if (imageFilename) {
            if (dish.image) {
                await diskStorage.deleteFile(dish.image);           
            }
             await knex("dishes").where({ id }).update({ image: imageFilename });
 
            dish.image = imageFilename;         
        } 

        return response.json({image: dish.image});
       } catch (error) {
            console.error("Erro na atualização do prato:", error);  
            return response.status(500).json({ message: "Não foi possível atualizar o prato", error: error.message });
        }
    }
}

module.exports = DishImageUpdateController;