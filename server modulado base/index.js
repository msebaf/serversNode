const server = require("./server");
const router = require("./router")
const manejador = require("./manejador")
let rutas={};
rutas["/"]= manejador.start;
rutas["/index"]= manejador.start;
rutas["/otro"] = manejador.otra;

server.startServer(router.rutear, rutas)