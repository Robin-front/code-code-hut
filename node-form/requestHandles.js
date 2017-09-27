const querystring = require('querystring');
const formidable = require('formidable');
const fs = require('fs');

function start(response, request) {
  console.log('request start was call!');

  var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+
      'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" enctype="multipart/form-data" '+
      'method="post">'+
      '<input type="file" name="upload" multiple="multiple">'+
      '<input type="submit" value="Upload file" />'+
      '</form>'+
      '</body>'+
      '</html>';

    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log('request upload page was call!');

  const form = new formidable.IncomingForm();

  form.uploadDir='./tmp';
  form.parse(request, (err, fields, files) => {
    // console.log('files', files);
    fs.renameSync(files.upload.path, './tmp/test.png');

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('received image: <br/>');
    response.write('<img src="/show">');
    response.end();
  });

}

function show(response) {
  console.log('request show was call!');
  fs.readFile('./tmp/test.png', (err, data) => {
    if (err) {
      response.writeHead(400, { 'Content-Type': 'text/plain'});
      response.write(err +'\n');
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'image/png'});
      response.write(data, 'binary');
      response.end();
    }
  });
}

module.exports = {
  start,
  upload,
  show,
}
