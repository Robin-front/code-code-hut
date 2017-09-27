const http = require('http');
const config = require('./config');
const url = require('url');

const start = (router, handle) => {
  http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname;
    router(handle, pathname, response, request);
  }).listen(config.port);
}

console.log('server is listening ' + config.port);

exports.start = start;
