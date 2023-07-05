//funciones

const db = require("./database");

//getAll

function getAll() {
  return db.select().from(`usuario`);
}

const getById = async (id) => {
  return await db.select().from(`usuario`).where({ id: id });
};

//JWT by email
const getByEmail = async (email) => {
  return await db.select().from(`usuario`).where({ email: email });
};

const create = async (data) => {
  return await db(`usuario`).insert(data).returning(`id`);
};

//**** UPDATE DE TAREAS  ****
const update = async (data) => {
  return await db(`usuario`)
    .where({ id: data.id })
    .update(data)
    .returning("id");
};

const delete1 = async (id) => {
  return await db(`usuario`).where({ id: id }).del();
};

module.exports = { getAll, getById, getByEmail, create, update, delete1 };
