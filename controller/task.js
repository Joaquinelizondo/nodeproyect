//definir un express para un controlador, en este caso de tareas

//las dos primeras lineas debe tener el express
const express = require(`express`);
//llamo a la parte que arma las rutas de los endpoints
const router = express.Router();

const tasks = require("../data/tasks");
const validations = require("../controller/validation");
const { validationresult } = require("express-validator");
const db = require("../services/database");
const taskService = require("../services/task");

//ingrear variables de entorno
//const connectionString = `postgress://`;

//const validateID = (id) => {
//  let idx = null;

//validar id
//if (id === undefined || id === null || id <= 0) {
//  return false;
//} else {
//  let idx = tasks.findIndex((task) => {
//    return task.id == id;
//  });
//  return !idx ? true : false;
// }
//};

//http://www.google.com/search?a=valver
//prot/dominio/endpoint/queryparams

//creo las rutas
//localhost:3000/tasks/
//**** GET: TOMAR TODAS LAS TAREAS *****
router.get(`/`, async (req, res) => {
  //en este espacio se escribe la logica de negocio
  const datos = await taskService.getAll();
  res.send(datos);
});

//***GET : TOMAR TODAS LAS TAREAS POR ID ***/
router.get(`/:id`, async (req, res) => {
  let id = req.params.id;
  const datos = await taskService.getById(id);
  res.send(datos);
});

//***** OK  ******
router.put(`/`, (req, res) => {
  validations.createTasksValidation(req.body);
  let { id, idu, prioridad, name, completed } = req.body;

  let task = {
    id,
    usuario_id: idu,
    prioridad_id: prioridad,
    titulo: name,
    completado: completed,
  };

  //let task = req.params.id;
  taskService.update(task);
  res.send(task);
});

// ******  POST OK  ******
router.post(`/`, (req, res) => {
  let { id, idu, prioridad, name, completed } = req.body;

  let task = {
    id,
    usuario_id: idu,
    prioridad_id: prioridad,
    titulo: name,
    completado: completed,
  };

  taskService
    .create(task)
    .then((createdTask) => {
      res.send(createdTask);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while creating the task.");
    });
});

//put - va por put para hacer la actualizacion del valor
//router.put("/:id", (req, res) => {
//  let { name, completed } = req.body;
//  let idx = tasks.findIndex((task) => {
//    return task.id == req.params.id;
//  });

//  tasks[idx].name = name;
//  tasks[idx].completed = completed;
//  res.send(tasks);
//});

//***** DELETE *****/

router.delete("/:id", (req, res) => {
  validations.createTasksValidation(req.body);
  let task = req.params.id;

  taskService.delete1(task);
  res.send(task);
});

//delete

//router.delete("/:id", (req, res) => {
// ubico la tarea segun el id y le asigno su posicion
//  let pos = tasks.findIndex((task) => {
//    return task.id == req.params.id;
//  });
// console.log("la posicion es:", pos);
//  tasks.splice(pos, 1);
//  comienza en la posición que nos indica el valor de la variable 'pos' y elimina 1 elemento.
//  res.send(tasks);
//});

module.exports = router;
