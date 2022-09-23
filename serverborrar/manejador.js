const fs= require("fs")
const serverInfo= require("./server")
function inicio(respuesta){
    let noticias=JSON.parse(fs.readFileSync("feeds/noticias.json"))
    let anexar=""
    noticias.news.forEach(noticia => {
        imgURL=noticia.urlToImage;
        anexar+= `<tr><td colspan = 2>${noticia.title}</td></tr>
    <tr><th>${noticia.content}</th><th><img src=${imgURL} alt=""></th></tr>
    <tr><th>autor: ${noticia.author}</th><th><a href = "/borrar?${noticias.news.indexOf(noticia)}"><button id="boton">Borrar</button></a></th></tr>
    <tr><th colspan =2></th><tr>;
    `
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
    <body> <div><h1>NOTICIAS</h1></div><div id ="marco"><table>` + anexar + `</table></div></body>
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
