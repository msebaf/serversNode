const http = require("http");
const url = require("url")


function startServer(rutear, rutas){
function servir(req, resp){
     
    console.log(`req recib de ${url}`);
    rutear(rutas, req, resp);
  
}

http.createServer(servir).listen(8888)
console.log("Server iniciado")
}

exports.startServer = startServer;

