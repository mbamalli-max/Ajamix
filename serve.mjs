// Lightweight static server for Claude Preview. Serves the repo root on $PORT.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = resolve(fileURLToPath(import.meta.url), '..');
const port = Number(process.env.PORT || 3002);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

createServer(async (req, res) => {
  try {
    let url = decodeURIComponent((req.url || '/').split('?')[0]);
    if (url === '/') url = '/app/index.html';
    if (url.endsWith('/')) url += 'index.html';
    const fsPath = join(here, url);
    if (!fsPath.startsWith(here)) {
      res.writeHead(403); res.end('forbidden'); return;
    }
    let s;
    try {
      s = await stat(fsPath);
    } catch {
      res.writeHead(404); res.end('not found: ' + url); return;
    }
    if (s.isDirectory()) {
      const fallback = join(fsPath, 'index.html');
      const body = await readFile(fallback);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
      return;
    }
    const headers = {
      'Content-Type': MIME[extname(fsPath)] || 'application/octet-stream',
      'Content-Length': s.size,
      'Last-Modified': s.mtime.toUTCString(),
    };

    if (url === '/app/content.json') {
      headers['Cache-Control'] = 'no-cache';
    }

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }

    const body = await readFile(fsPath);
    res.writeHead(200, headers);
    res.end(body);
  } catch (err) {
    res.writeHead(500); res.end(String(err));
  }
}).listen(port, () => {
  console.log(`serving ${here} on http://localhost:${port}`);
});
