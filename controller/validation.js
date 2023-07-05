const { check } = require("express-validator");

function createTasksValidation(data) {
  let { id, name, completed } = data;

  //validar nombre

  if (typeof name !== `string`) {
    throw new Error(`nombre debe ser string`);
  }
  if (name.length <= 3) {
    throw new Error(`nombre debe contener mas de 3 caracteres`);
  }
  if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name)) {
    throw new Error(`debe contener solo letras`);
  }

  //validar id (falta validar solo 1 id)
  if (id < 0) {
    throw new Error(`el id es incorrecto`);
  }

  //validar conmpleted o no
  if (completed == true && completed == false) {
    throw new Error(`completed incorrecto`);
  }
}

module.exports = {
  createTasksValidation,
};
