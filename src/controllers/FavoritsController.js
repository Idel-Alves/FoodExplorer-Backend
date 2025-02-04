const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class FavoritsController {
    async create(request, response) {
        const user_id = request.user.id;
        const { dish_id } = request.params;
        
        const database = await sqliteConnection();
        const userExists = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);
        if (!userExists) {
            return response.status(404).json({ message: "Usuário não encontrado" });
        }

        const favoriteExists = await knex("favorits").where({ user_id, dish_id }).first();
        if (favoriteExists) {
            return response.status(400).json({ message: "Prato já nos favoritos" });
        }
        
        const favoriteCreated = await knex("favorits").insert({
            user_id,
            dish_id
        });

        return response.status(201).json({ message: "Prato adicionado aos favoritos", favorite: favoriteCreated });

    } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Server error" });
        }

        async show(request, response, next) {
            const { id } = request.params;
        
            try {
                const showFavorite = await knex("favorits").where({ id }).first();
        
                if (!showFavorite) {
                    return response.status(404).json({ error: "Favorito não encontrado!" });
                }
        
                return response.json(showFavorite);
            } catch (error) {
                next(error); 
            }
        }
    
        async delete(request, response, next) {
            const { id } = request.params;

            try{
                const deleteFavorits = await knex("favorits").where({ id }).delete();

                if (deleteFavorits === 0) {
                    return response.status(404).json({ error: "Favorito não encontrado!" });
                }
                
                return response.status(200).json({ message: "Favorito deletado com sucesso!" });
            } catch(error) {
                next(error);
            }
            
        }
}

module.exports = FavoritsController;