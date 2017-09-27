const app = require('./server.js');
const router = require('./router.js');
const config = require('./config');


app.start(router.route, config.handle);
