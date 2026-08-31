const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('SipFlow Backend is running!');
    return;
  }

  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'ok',
      service: 'sipflow-backend'
    }));
    return;
  }
  if (req.url === '/api/menu') {
  const menu = [
    {
      id: 1,
      name: 'Cappuccino',
      price: 3.5
    },
    {
      id: 2,
      name: 'Pastel de Nata',
      price: 1.5
    }
  ];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(menu));
  return;
}

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    error: 'Route not found'
  }));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});