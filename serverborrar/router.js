const fs= require("fs");

function rutear(manejador, req, respuesta){
    const url = new URL('http://localhost:8888' + req.url)
    pathDir = url.pathname;
    console.log(`pedido de ${pathDir}`)
    if(typeof manejador[pathDir] === "function"){
        manejador[pathDir](respuesta);
    }
    
    else if(pathDir=="/borrar"){
    
        let info=""
        req.on('data', datosparciales => {
          info += datosparciales
          console.log(info)
        })
        req.on('end', () => {
          const formulario = new URLSearchParams(info)
          let notisJSON = fs.readFileSync("feeds/noticias.json")
          notis = JSON.parse(notisJSON)
          aBorrar = url.search.substring(1,2)
          notis.news.splice(aBorrar,1);
          fs.writeFile("./feeds/noticias.json", JSON.stringify(notis), (err) => {
            if (err){
              console.log(err);
            }
            else{
              console.log("Se escribio")
              manejador["/index"](respuesta);
            }
          }
          );
        })
       
  
      }
    else{
       
            
             fs.readFile("error.jpg", function (error, exito){
                 if(error){
                     respuesta.writeHead(500, {"Content-Type" : "text/html"})
                     respuesta.write("Error 500");
                     respuesta.end();
                 }
                 else{
                     respuesta.writeHead(404, {"Content-Type" : "image/jpg"})
                     respuesta.write(exito)
                     respuesta.end();
                 }
             })
       
        
    }
}

exports.rutear = rutear;