const { hash } = require("bcryptjs");

exports.seed = async function (knex) {
  // await knex('users').delete()
  await knex("users").insert([
    {
      name: "user",
      email: "user@email.com",
      password: await hash("123456", 8),
      isAdmin: false
    }
  ])
}