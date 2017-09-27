const child = require('child_process');
let worker;

main(process.argv.slice(2));

function main (argv) {
  spawn('index.js', argv[0]);
  process.on('SIGTERM', () => {
    worder.kill();
    process.exit(0);
  });
}

function spawn(server, config) {
  worder = child.spawn('node', [server, config]);

  worder.on('exit', code => {
    if (code !== 0) {
      spawn(server, config);
    }
  });
}
