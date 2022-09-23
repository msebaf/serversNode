

function rutear(manejador, path, respuesta){
    console.log(`pedido de ${path}`)
    if(typeof manejador[path] === "function"){
        manejador[path](respuesta);
    }
    else{
        console.log("error 404")
        respuesta.writeHead(404, {"Content-Type": "text/plain"});
        respuesta.write("404 Not found");
        respuesta.end();
    }
}

exports.rutear = rutear;