function start(respuesta){
    console.log("hola start")
    respuesta.writeHead(200, {"Content-Type": "text/plain"});
respuesta.write("Hola");
respuesta.end();
}

function otra(respuesta){
 console.log("hola otra")
 respuesta.writeHead(200, {"Content-Type": "text/plain"});
 respuesta.write("Hola222");
 respuesta.end();
 }


exports.start = start;
exports.otra = otra;