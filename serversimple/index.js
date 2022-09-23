const http = require("http");
const fs = require("fs");
const path = require("path");



http.createServer(function(req, res){

  const url = new URL('http://localhost:8888' + req.url)
 let path = req.url;
  console.log(url)
   
    if (path=="/" || path == "/index"){
      let notisJSON = fs.readFileSync("feeds/noticias.json")
notis = JSON.parse(notisJSON)
contennidoAagregar="";
notis.news.forEach(noti => {
contennidoAagregar+= `<div><h3>${noti.author}</h3>
<h1>${noti.title}</h1>
<p>${noti.content}</p><a href = "/editar?${noti.id}"><button>Editar</button></a></div>`
 
});
       res.writeHead(200, { 'Content-Type': 'text/html' })
          res.write(`<!DOCTYPE html>
            <html>
            <head>
               <title>Document</title>
               <link rel="stylesheet" href="style.css">
            </head>
            <body>` + contennidoAagregar + `</body>
            </html>`)
          res.end()

    }
  
    else if(path=="/style.css"){
      
      style = fs.readFileSync("style.css")
      res.writeHead(200, { 'Content-Type': 'text/css' })
          res.write(style)
          res.end()

    }
    else if(path=="/editar"+url.search){
   
      
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(`<!DOCTYPE html>
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
      res.end()

    }
    else if(path=="/modificar"){
    
      let info=""
      req.on('data', datosparciales => {
        info += datosparciales
        console.log(info)
      })
      req.on('end', () => {
        const formulario = new URLSearchParams(info)
    
    notis.news[`${formulario.get("Nnoti")}`-1].content = formulario.get('noti')
    console.log(notis.news[`${formulario.get("Nnoti")}`-1].content = formulario.get('noti'))
        fs.writeFile("./feeds/noticias.json", JSON.stringify(notis), (err) => {
          if (err){
            console.log(err);
          }
          else{
            console.log("Se escribio")
            path == "/index";
            let notisJSON = fs.readFileSync("feeds/noticias.json")
              notis = JSON.parse(notisJSON)
              contennidoAagregar="";
              notis.news.forEach(noti => {
              contennidoAagregar+= `<div><h3>${noti.author}</h3>
              <h1>${noti.title}</h1>
              <p>${noti.content}</p><a href = "/editar?${noti.id}"><button>Editar</button></a></div>`
              
              });
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                        res.write(`<!DOCTYPE html>
                          <html>
                          <head>
                            <title>Document</title>
                            <link rel="stylesheet" href="style.css">
                          </head>
                          <body>` + contennidoAagregar + `</body>
                          </html>`)
                        res.end()
            
          }
        }
        );
      })
     

    }





}).listen(8888)