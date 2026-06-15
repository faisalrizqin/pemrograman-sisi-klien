let server;
let loadError = null;

try {
  const jsonServer = require('json-server');
  const path = require('path');
  const fs = require('fs');

  server = jsonServer.create();

  // Locate the bundled db.json
  let sourceDbPath = path.join(process.cwd(), 'db.json');
  if (!fs.existsSync(sourceDbPath)) {
    sourceDbPath = path.join(__dirname, 'db.json');
  }
  if (!fs.existsSync(sourceDbPath)) {
    sourceDbPath = path.join(__dirname, '../db.json');
  }

  // Writable /tmp directory for Vercel
  const targetDbPath = path.join('/tmp', 'db.json');

  if (fs.existsSync(sourceDbPath)) {
    fs.copyFileSync(sourceDbPath, targetDbPath);
  } else {
    const defaultDb = { user: [], mahasiswa: [], dosen: [], matakuliah: [], kelas: [], chart: [] };
    fs.writeFileSync(targetDbPath, JSON.stringify(defaultDb));
  }

  const router = jsonServer.router(targetDbPath);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(jsonServer.rewriter({
    '/api/*': '/$1'
  }));
  server.use(router);
} catch (err) {
  loadError = err;
}

module.exports = (req, res) => {
  if (loadError) {
    res.status(500).json({
      error: 'Failed to initialize serverless function',
      message: loadError.message,
      stack: loadError.stack,
      cwd: process.cwd(),
      dirname: __dirname
    });
    return;
  }
  return server(req, res);
};
