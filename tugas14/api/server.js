const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();

// Load the merged db.json database from the project root
const router = jsonServer.router(path.join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom rewrites to strip the /api prefix before routing
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
