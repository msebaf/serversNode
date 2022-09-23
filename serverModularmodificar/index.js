const server = require("./server");
const router = require("./router")
const manejador = require("./manejador")
let rutas={};
rutas["/"]= manejador.inicio;
rutas["/index"]= manejador.inicio;
rutas["/style.css"] = manejador.estilo;

server.startServer(router.rutear, rutas)