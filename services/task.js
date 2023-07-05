//funciones

const db = require("./database");

//getAll

function getAll() {
  return db.column(`id`, `titulo`, `completado`).select().from(`tarea`);
}

const getById = async (id) => {
  return await db.select().from(`tarea`).where({ id: id });
};

const create = async (data) => {
  return await db(`tarea`).insert(data).returning("id");
};

//**** UPDATE DE TAREAS  ****
const update = async (data) => {
  return await db("tarea").where({ id: data.id }).update(data).returning("id");
};

const delete1 = async (id) => {
  return await db("tarea").where({ id: id }).del();
};

//getById;
//function getById(id) {
//  return db
//    .column(`id`, `nombre`)
//    .select()
//    .from(`usuarios`)
//    .where({ id })
//    .first();
//}

//create
//createTask = (task) => {
//  db(`tarea`)
//    .insert(task)
//    .then((result) => {
//      return res.status(201).json({ message: "tarea no encontrada" });
//    })
//    .catch((err) => {
//      return res.status(500).json({ message: "error" });
//    });
//};

//const create = async (data) => {
//  return await db(`tarea`).insert(data).returning(`id`);
//};

//delete
//function deleteSetComplete(id) {
//  return db(`usuarios`).where({ id }).delete(usuarios).returning(`*`);
//}

module.exports = { getAll, getById, create, update, delete1 };
