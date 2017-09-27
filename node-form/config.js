const requestHandles = require('./requestHandles');

const port = '8080';

const handle = {
  '/': requestHandles.start,
  '/start': requestHandles.start,
  '/upload': requestHandles.upload,
  '/show': requestHandles.show,
}

module.exports = { port, handle }
