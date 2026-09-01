const http = require('node:http');
const menu = require('./data/menu');  
const events = require('./data/events');
const createEvent = require('./routes/events');
const getProduct = require('./routes/menu');

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
  if (req.method === 'POST' && req.url === '/api/events') {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const event = JSON.parse(body);
            if (!event.type) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        error: 'Event type is required'
    }));

    return;
}

            const createdEvent = createEvent(event);

            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify({
                message: 'Event recorded',
                event: createdEvent
            }));

        } catch (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify({
                error: 'Invalid JSON'
            }));
        }
    });

    return;
}
if (req.url === '/api/events' && req.method === 'GET') {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(events));

  return;
}
if (req.url.startsWith('/api/menu/')) {
    const id = Number(req.url.split('/')[3]);

    const item = getProduct(id);

    if (!item) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: 'Product not found'
        }));
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(item));
    return;
}
  if (req.url === '/api/menu') {
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