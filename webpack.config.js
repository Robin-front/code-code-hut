var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: {
        "rodash": './rodash/rodash.js'
    },
    externals: { },
    resolve: {
        // root: path.resolve('./node_modules'),
        extensions: ['.js']
    },
    module: {
        noParse: /jquery|lodash/, //忽略解析类库
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(scss|sass)/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: 'css-loader!sass-loader',
                })
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/,
                include: [__dirname]
            }
        ]
    },
    output: {
        path: path.resolve('rodash/dist/'),
        filename: '[name].js'
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //   context: __dirname,
        //   /**
        //    * 在这里引入 manifest 文件
        //    */
        //   manifest: require('./dist/vendor-manifest.json')
        // })
    ]
}

if(process.env.NODE_ENV === 'production') {
    config.output.filename = '[name].min.js';
    config.plugins = config.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].min.css')
    );
    config.performance = {
      hints: "error"
    }
}else {
    config.output.filename = '[name].js';
    config.plugins.push(new ExtractTextPlugin('[name].css'));
    config.devtool = 'cheap-source-map';
    config.watchOptions = {
      aggregateTimeout: 3000,
      ignored: /node_modules/
    }
}

module.exports = config
