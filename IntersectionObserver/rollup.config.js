import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
// import uglify from 'rollup-plugin-uglify';

const ENV = process.env.npm_lifecycle_event;

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

let config = {
  input: 'src/index.js',
  output: {
    file: 'dist/IntersectionObserver.js',
    format:'umd',
  },
  name: 'IntersectionObserver',
  plugins: [
    babel(babelrc({ addModuleOptions: false })),
    // uglify()
  ],
  external: external
}

export default config
