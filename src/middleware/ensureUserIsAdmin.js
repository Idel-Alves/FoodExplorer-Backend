const AppError = require("../utils/AppError");
const knex = require("../database/knex");

async function ensureUserIsAdmin(request, response, next) {
    const user_id = request.user.id;

   const user = await knex("users").where({ id: user_id }).first();

   if(!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    if(user.isAdmin === "false") {
     throw new AppError("Usuário não autorizado!");
    }

  next();
}

module.exports = ensureUserIsAdmin;