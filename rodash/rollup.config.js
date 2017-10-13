import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';

const ENV = process.env.npm_lifecycle_event;

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let config = {
  entry: 'rodash/rodash.js',
  format:'umd',
  plugins: [
    babel(babelrc({ addModuleOptions: false }))
  ],
  external: external
}

if(ENV === 'dist'){
  config.plugins.push(uglify())
  config.dest = 'rodash/dist/rodash.min.js'
}else if(ENV==='dev'){
  config.dest = 'rodash/dist/rodash.js'
}else{
  config.dest = 'rodash/dist/'+ENV+'/rodash.js'
}

export default config
