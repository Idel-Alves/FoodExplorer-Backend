const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(request, response) {
        let { name, email, password, isAdmin } = request.body;

        if(!isAdmin) {
            isAdmin = "false";
        }

        if (!name || !email || !password) {
            throw new AppError("Nome, e-mail e senha são obrigatórios.");
        }

        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso.");
        };

        if (password.length < 6) {
            throw new AppError("A senha deve ter pelo menos 6 caracteres.")
        };

        const hashedPassword = await hash(password, 8);

        await database.run(
            "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, isAdmin]
        );

        return response.status(201).json();
    };

    async update(request, response) {
        const {  name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if (!user) {
            throw new AppError("Usuário não encontrado!");
        };

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso!");
        };

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password) {
            if (password.length < 6) {
                throw new AppError("A senha deve ter pelo menos 6 caracteres.")
            };
        }

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova!");
        };

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.");
            };

            user.password = await hash(password, 8);
        };

        await database.run(`
        UPDATE users SET name = ?, email = ?, password = ?, updated_at = DATETIME('NOW') WHERE id = ?`, [user.name, user.email, user.password, user_id]);

        return response.status(201).json();
    };
};

module.exports = UsersController;