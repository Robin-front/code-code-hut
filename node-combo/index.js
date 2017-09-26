// http://assets.example.com/foo/??bar.js,baz.js
// http://assets.example.com/foo/bar.js
const fs = require('fs');
const path = require('path');
const http = require('http');

const MIME = {
  '.css': 'text/css',
  '.js': 'application/javascript'
}

let server;

main(process.argv.slice(2));

function main(argv) {
  const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
  const port = config.port||8080;
  const root = config.root||'.';

  server = http.createServer((request, response) => {
    const urlParams = parseUrl(root, request.url);

    checkFiles(urlParams.pathnames, (err, pathnames) => {
      if (err) {
        response.writeHead(404);
        response.end(err.message);
      } else {
        response.writeHead(200, {
          'Content-type': urlParams.mime
        });
        outputFiles(pathnames, response);
      }
    });
  }).listen(port);

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });
}

function parseUrl(root, url) {
  let parts, base, pathnames;

  if (url.indexOf('??') === -1){
    url = url.replace('/', '/??');
  }
  parts = url.split('??');
  base = parts[0];
  pathnames = parts[1].split(',').map(value => path.join(root, base, value));

  return {
    mime: MIME[path.extname(pathnames[0])]||'text/plain',
    pathnames
  }
}

function checkFiles(pathnames, cb) {
  (function next(i, len){
    if (i < len) {
      fs.stat(pathnames[i], (err, stats) => {
        if (err) {
          cb(err);
        } else if (!stats.isFile()) {
          cb(new Error(pathnames[i] + ' is not a file!'));
        } else {
          next(++i, len);
        }
      });
    } else {
      cb(null, pathnames);
    }
  })(0, pathnames.length);
}

function outputFiles(pathnames, response) {
  (function next(i, len){
    if (i < len) {
      const readStream = fs.createReadStream(pathnames[i]);

      readStream.pipe(response, { end: false });
      readStream.on('end', () => {
        next(++i, len);
      });
    } else {
      response.end();
    }
  })(0, pathnames.length);
}
