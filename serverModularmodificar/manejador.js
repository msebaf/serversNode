const fs= require("fs")
const serverInfo= require("./server")
function inicio(respuesta){
    let noticias=JSON.parse(fs.readFileSync("feeds/noticias.json"))
    let anexar=""
    noticias.news.forEach(noticia => {
        imgURL=noticia.urlToImage;
        anexar+= `<div><div id="title">${noticia.title}</div>
        <div id="marcoCuerpo"><div id="noticia">${noticia.content}<div id="autor">Autor: ${noticia.author}</div></div> <div id="foto"><img src=${imgURL} alt=""></div></div>
        <a href = "/editar?${noticia.id}"><button>Editar</button></a></div>
        <hr>
    </div>`
    });
    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write(`<!DOCTYPE html>
    
    <html>
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/style.css">
    </head>
    <body> <div><h1>NOTICIAS</h1></div>` + anexar + `</body>
    </html>`)
respuesta.end();
}

function estilo(respuesta){
 let estilo = fs.readFileSync("style.css");
 respuesta.writeHead(200, {"Content-Type": "text/css"});
 respuesta.write(estilo);
 respuesta.end();
 }


exports.inicio = inicio;
exports.estilo = estilo;
