'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8'};
const server = http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname); }
  catch { response.writeHead(400); return response.end('Solicitud no válida.'); }
  let file = path.resolve(root,'.'+pathname);
  if (file !== root && !file.startsWith(root+path.sep)) { response.writeHead(403); return response.end('Acceso no permitido.'); }
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
    const data = fs.readFileSync(file);
    response.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    response.end(data);
  } catch { response.writeHead(404); response.end('Archivo no encontrado.'); }
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'El puerto 4173 está en uso. Detén el otro servidor e inténtalo nuevamente.':error.message);process.exitCode=1;});
server.listen(4173,'127.0.0.1',()=>console.log('Linde disponible en http://127.0.0.1:4173 · Ctrl+C para detener.'));
