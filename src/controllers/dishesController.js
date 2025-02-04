const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class DishesController {
  async create(request, response) {
   try {

    const { title, description, price, category, ingredients } = request.body;
    const image = request.file;

     if (!image) {
      return response.status(400).json({ error: "A imagem é obrigatória." });
    }

    const database = await sqliteConnection();
    const checkDishExists = await database.get("SELECT * FROM dishes WHERE title = (?)", [title]);
    if(checkDishExists) {
      throw new AppError("Já existe um prato com esse título.");
    }

    let [dishId] = await knex("dishes").insert({
      title,
      price,
      description,
      category,
      image: image.filename 
    });

    let ingredientsArray = [];
    if (typeof ingredients === "string") {
      ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());
    } else if (Array.isArray(ingredients)) {
      ingredientsArray = ingredients;
    } else {
      return response.status(400).json({ error: "Os ingredientes devem ser uma string ou uma matriz." });
    }

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id: dishId,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);
    const BaseURL = process.env.BASE_URL || "http://localhost:3333"

    return response.status(201).json({ dishId, imageUrl: `${BaseURL}/files/${image.filename}` });
  } catch (error) {
    console.error(error);  
    return response.status(500).json({ error: error.message || "Erro inesperado." });
}

  };

  async update (request, response) {
    const { title, price, category, description, ingredients } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    await database.run(
      "UPDATE dishes SET title = ?, price = ?, description = ?, category = ? WHERE id = ?",
      [title, price, description, category, id]
    );

    let ingredientsArray = [];
    if (typeof ingredients === "string") {
      ingredientsArray = ingredients.split(",").map((ingredient) => ingredient.trim());
    } else if (Array.isArray(ingredients)) {
      ingredientsArray = ingredients;
    } else {
   
      return response.status(400).json({ error: "Os ingredientes devem ser uma string ou uma matriz." });
    }

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id: id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

      return response.status(201).json();
  };

  async show (request, response) {
    const {id} = request.params;
    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id})
    return response.json({...dish, ingredients});
  };

  async delete (request, response) {
    const { id } = request.params;
    await knex("dishes").where({ id }).delete();

    return response.status(201).json();
  }

  async index(request, response) {
    const { search } = request.query;

    let dishes;
  
    if (search) {
      const keywords = search.split(" ").map((keyword) => `%${keyword}%`);

      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .where((builder) => {
          builder.where((builder2) => {
            keywords.forEach((keyword) => {
              builder2.orWhere("dishes.title", "like", keyword);
              builder2.orWhere("dishes.description", "like", keyword);
            });
          });
          keywords.forEach((keyword) => {
            builder.orWhere("ingredients.name", "like", keyword);
          });
        })
        .groupBy("dishes.id")
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .orderBy("dishes.title");
    }

    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = dishesIngredients.filter((ingredient) => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });

    return response.json(dishesWithIngredients);
  }
  
}

module.exports = DishesController;
