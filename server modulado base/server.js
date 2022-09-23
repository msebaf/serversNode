const http = require("http");
const url = require("url")


function startServer(rutear, rutas){
function servir(req, resp){
    const url = new URL('http://localhost:8888' + req.url)
    console.log(`req recib de ${url}`);
    rutear(rutas, url.pathname, resp);
  
}

http.createServer(servir).listen(8888)
console.log("Server iniciado")
}

exports.startServer = startServer;
