const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();

// Locate where db.json is bundled
let sourceDbPath = path.join(process.cwd(), 'db.json');
if (!fs.existsSync(sourceDbPath)) {
  sourceDbPath = path.join(__dirname, 'db.json');
}
if (!fs.existsSync(sourceDbPath)) {
  sourceDbPath = path.join(__dirname, '../db.json');
}

// Vercel serverless functions have write access ONLY in /tmp
const targetDbPath = path.join('/tmp', 'db.json');

try {
  // If the target db.json doesn't exist in /tmp, copy it from the read-only source
  if (fs.existsSync(sourceDbPath)) {
    fs.copyFileSync(sourceDbPath, targetDbPath);
    console.log('Successfully copied db.json to /tmp');
  } else {
    // Fallback: Create a default database structure if not found
    const defaultDb = { user: [], mahasiswa: [], dosen: [], matakuliah: [], kelas: [], chart: [] };
    fs.writeFileSync(targetDbPath, JSON.stringify(defaultDb));
    console.log('Created fallback db.json in /tmp');
  }
} catch (err) {
  console.error('Error preparing database in /tmp:', err);
}

// Point router to the writable database in /tmp
const router = jsonServer.router(targetDbPath);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom rewrites to strip the /api prefix before routing
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

module.exports = server;
