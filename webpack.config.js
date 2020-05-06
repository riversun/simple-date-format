const packageJson = require('./package.json');
const version = packageJson.version;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {

  const conf = {
    mode: 'development',
    devServer: {
      open: true,
      openPage: 'index.html',
      contentBase: path.join(__dirname, 'public'),
      watchContentBase: true,
      port: 8080,
      host: argv.mode === 'production' ? `localhost` : `localhost`,
      disableHostCheck: true,
    },
    entry: {
      'simple-date-format': ['./src/simple-date-format.js'],

    },
    output: {
      path: path.join(__dirname, 'lib'),
      publicPath: '/',
      filename: argv.mode === 'production' ? `[name].js` : `[name].js`,  //`[name].min.js`
      library: 'SimpleDateFormat',
      libraryExport: 'default',
      libraryTarget: 'umd',
      globalObject: 'this',//for both browser and node.js
      umdNamedDefine: true,
      auxiliaryComment: {
        root: 'for Root',
        commonjs: 'for CommonJS environment',
        commonjs2: 'for CommonJS2 environment',
        amd: 'for AMD environment'
      }
    },

    optimization: {
      minimizer: [new TerserPlugin({
        //extractComments: true,
        //cache: true,
        //parallel: true,
        //sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      })],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
            }
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            { loader: 'url-loader' },
          ]
        },
      ],

    },
    resolve: {
      alias: {}
    },
    plugins: [
      new webpack.BannerPlugin(`[name] v${version} Copyright (c) 2019-2020 https://github.com/riversun(riversun.org@gmail.com)`),
    ],

  };

  if (argv.mode !== 'production') {
    conf.devtool = 'inline-source-map';
  }

  return conf;

};
