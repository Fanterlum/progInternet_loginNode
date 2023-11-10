// src/server.js

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const picoColors = require('picocolors');
const { parse } = require('querystring');

dotenv.config();

const appDirectory = process.cwd();
const userData = {};


async function serveDashboardPage(res, userId) {
  console.log(userId);
  console.log(userData);
  if (userData[userId] && userData[userId].length > 0) {
    // Si el usuario tiene horas registradas, generamos dinámicamente la lista.
    let dashboardHtml = '<h1>Dashboard</h1>';
    dashboardHtml += '<h2>Horas Registradas:</h2>';
    dashboardHtml += '<ul>';

    for (const entry of userData[userId]) {
      dashboardHtml += `<li>Fecha: ${entry.date}, Horas: ${entry.hours}, Actividad: ${entry.activity}</li>`;
    }

    dashboardHtml += '</ul>';
    // Agregamos un botón para regresar a la página de registro de horas.
    dashboardHtml += '<a href="/service_hours.html">Registrar Horas</a>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(dashboardHtml);
  } else {
    // Si el usuario no tiene horas registradas, mostramos un mensaje y un enlace para registrar horas.
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Dashboard</h1><p>No hay horas registradas.</p><a href="/service_hours.html">Registrar Horas</a>');
  }
}


async function serveFile(req, res) {
  try {
    let filePath = path.join(appDirectory, 'public', req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath).toLowerCase();

    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    const content = await fs.readFile(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  } catch (error) {
    console.error('Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error interno del servidor');
  }
}

async function handleLogin(req, res) {
  try {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const formData = parse(body);

        // Verifica si el nombre de usuario y la contraseña son correctos (solo como ejemplo)
        if (formData.username === 'usuario' && formData.password === 'contrasena') {
          // Autenticación exitosa, redirige al dashboard
          serveDashboardPage(res, 'user123'); // Simulación de usuario autenticado
        } else {
          // Credenciales incorrectas, redirige al formulario de inicio de sesión
          res.writeHead(302, { 'Location': '/login.html' });
          res.end();
        }
      });
    } else {
      // Si no es una solicitud POST, simplemente sirve el formulario de inicio de sesión
      const content = await fs.readFile(path.join(appDirectory, 'public', 'login.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error interno del servidor');
  }
}

async function handleServiceHours(req, res) {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = parse(body);

      // Obtén el ID del usuario autenticado (simulado)
      const userId = 'user123'; // Aquí debes obtener el ID del usuario autenticado.

      // Almacena las horas de servicio social en el almacén de datos.
      if (!userData[userId]) {
        userData[userId] = [];
      }

      userData[userId].push({
        date: new Date().toISOString(),
        hours: parseFloat(formData.hours),
        activity: formData.activity,
      });
      
      // Redirige de vuelta a la página de registro de horas.
res.writeHead(302, { 'Location': '/dashboard.html' });
res.end();
    });
  } else {
    // ... (código para la página de registro de horas)
  }
}


const server = http.createServer(async (req, res) => {
  if (req.url === '/login' || req.url === '/login/') {
    handleLogin(req, res);
  } else if (req.url === '/service_hours' || req.url === '/service_hours/') {
    handleServiceHours(req, res);
  } else if (req.url === '/dashboard' || req.url === '/dashboard/') {
    // Aquí obtenemos el ID del usuario autenticado (simulado).
    const userId = 'user123'; // Debes obtener el ID del usuario autenticado.

    // Servir la página de dashboard para el usuario autenticado.
    serveDashboardPage(res, userId);
  } else {
    serveFile(req, res);
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(picoColors.green(`Servidor escuchando en http://localhost:${port}/`));
});
