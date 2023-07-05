const express = require("express");

//es el encargado de amrar las rutas de los endpoints
const router = express.Router();

const app = express();
app.use(express.json());
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const userServices = require("../services/usuario");

//localhost:3001/auth/register - POST
router.post("/register", async (req, res) => {
  const { nombre, phonenumber, email } = req.body;
  //encriptar password
  //salt valor que se genera en forma random
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  let newUser = { nombre, phonenumber, email, password };

  //registrar en la base de datos
  const createUser = userServices.create(newUser);

  //retornar valir si esta ok
  //no es neceario ingresarle error, ya lo tiene
  res.json({ sucess: true, createUser });
});

//localhost:3001/auth/login - POST
router.post("/login", async (req, res) => {
  //getByEmail
  const { email, password } = req.body;

  const usuario = await userServices.getByEmail(email);
  if (!usuario) {
    res
      .status(404)
      .send({ error: "no se ha encontrado el usuario o contraseña " });
  }

  const validPassword = await bcrypt.compare(
    req.body.password,
    usuario.password
  );

  if (!validPassword) {
    res.status(404).send({ error: "usuario o contraseña incorrecta" });
  }

  res.send({ success: true, message: "usuario atenticado exitosamente" });
});

//localhost:3001/auth/logout - POST
router.post("/logout", async (req, res) => {
  res.send({ success: true, message: "Cierre de sesión exitoso" });
});

app.post("/sign_up", (req, res) => {
  // const salt = bcrypt.genSaltSync(10);
  // const password = bcrypt.hashSync(req.body.password, salt);
  console.log(req.body);
  //guardarlo en base de datos
  return res.status(201).json({ message: "usuario registrado con exito" });
});
//saveUser({ mail: req.body.mail, password: password });

module.exports = router;
