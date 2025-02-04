const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
    async update(request, response) {
        const id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const user = await knex("users").where({id: id}).first();

        if(!user) {
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
        }

        if(avatarFilename) {
            if (user.avatar) {
                await diskStorage.deleteFile(user.avatar);
            }
            await knex("users").where({ id }).update({ avatar: avatarFilename });
            user.avatar = avatarFilename; 
        }

        return response.json(user);
    }    
}

module.exports = UserAvatarController;