const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Home route
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World\n');
  }

  // NEW ROUTE: /about
  else if (req.url === '/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is the About page\n');
  }

  // If route not found
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Page Not Found\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

