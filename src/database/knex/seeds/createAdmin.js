const { hash } = require("bcryptjs");

exports.seed = async function (knex) {
  // await knex('users').delete()
  await knex("users").insert([
    {
      name: "Admin",
      email: "admin@email.com",
      password: await hash("121212", 8),
      isAdmin: true
    }
  ])
}