//llamar al dotenv par que cargue los valores estabelcidos en .env
require(`dotenv`).config();

//importamos express, es el inicio de la app
const { urlencoded } = require(`express`);

//instalamos librerieas para que se ejecute
const express = require(`express`);
const cors = require(`cors`);
const authRoutes = require("../server/controller/auth");

//control que contiene las rutas de los endpoints
const taskController = require("./controller/task");

//hace referebncia a la ejecucion del express, reserva 1 lugar del express para ejecutarlo
const app = express();

let corsOptions = {
  origin: `http://127.0.0.1:3001`,
  optionsSuccessStatus: 200,
};

//utiliza cors
app.use(cors(corsOptions));

//expres va a ejecutar llamadas tipo json
app.use(express.json());

//establecemos el puerto para la app : forma reservada de node para llamar a
//las variables que estamos utilizando

const port = process.env.APP_PORT;

//esto es el inicio de la app get localhost:3000
//primera llamada que es el home o la /
app.get("/", (req, res) => {
  res.send("bienvenidos a nuestra API de tareas");
});

//app.get("/json", jsonHandler);
//app.get("usuarios", getUsers);

//app.get("/usuarios/id", getUser);

//se utilizan los endpoints // indica que en localhost hay lgo q tenemos que ejecutar
app.use(`/tasks`, taskController);

//Rutas para registro y autenticacion de usuarios
app.use(`/auth`, authRoutes);

//defino uso de las rutars creadas

app.use((error, req, res, next) => {
  res.status(402).json({
    status: `error`,
    message: error.message,
  });
});

//pongo a correr el servidor

app.listen(port, () => {
  console.log(`la app se ejecuta en http://localhost:${port}`);
});
