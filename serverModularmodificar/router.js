const fs= require("fs");

function rutear(manejador, req, respuesta){
    const url = new URL('http://localhost:8888' + req.url)
    pathDir = url.pathname;
    console.log(`pedido de ${pathDir}`)
    if(typeof manejador[pathDir] === "function"){
        manejador[pathDir](respuesta);
    }
    else if(pathDir == "/editar"){
        console.log("hola")
        {
            respuesta.writeHead(200, { 'Content-Type': 'text/html' })
            respuesta.write(`<!DOCTYPE html>
              <html>
              <head>
                 <title>Document</title>
                 <link rel="stylesheet" href="style.css">
              </head>
              <body>
              <h1>Editor</h1>
              <form action="modificar" method="post">
              <label for ="Nnoti"></label>
              <input type="hidden" name="Nnoti"  value=${url.search.substring(1,2)}>
              <label for ="noti"></label>
              <textarea name="noti" rows="10" cols="50"></textarea><br>
              <input type="submit" value="Editar">
              </form>
              </body>
              </html>`)
            respuesta.end()
         }
    }
    else if(pathDir=="/modificar"){
    
        let info=""
        req.on('data', datosparciales => {
          info += datosparciales
          console.log(info)
        })
        req.on('end', () => {
          const formulario = new URLSearchParams(info)
          let notisJSON = fs.readFileSync("feeds/noticias.json")
          notis = JSON.parse(notisJSON)
      notis.news[`${formulario.get("Nnoti")}`-1].content = formulario.get('noti')
      console.log(notis.news[`${formulario.get("Nnoti")}`-1].content = formulario.get('noti'))
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