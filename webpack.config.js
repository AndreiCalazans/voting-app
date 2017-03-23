var path = require('path');
var webpack = require('webpack');
process.noDeprecation = true;
var envFile = require('node-env-file');
process.env.NODE_ENV= process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {

}


module.exports = {
  entry: [
    "script-loader!jquery/dist/jquery.js",
    './app/app.js'
  ],
  externals: {
    jQuery: 'jQuery'
  },
  plugins:[
    new webpack.ProvidePlugin({
      '$': 'jQuery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [
    path.resolve('./app/components'),
    path.resolve('./node_modules'),
    path.resolve('./app/api/'),
    path.resolve('./app/styles/'),
    path.resolve('./app/actions/'),
    path.resolve('./app/reducers/'),
    path.resolve('./app/store/'),
    path.resolve('./app/')
    ],
    extensions: [" " ,".js", "jsx"]
  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react','es2015', 'stage-0']
      }
    },
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader", // compiles Sass to CSS
            }]
        },
        {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                       {
                         loader: 'file-loader',
                         options: {
                           query: {
                             name:'./public/[name].[ext]'
                           }
                         }
                       },
                       {
                         loader: 'image-webpack-loader',
                         options: {
                           query: {
                             mozjpeg: {
                               progressive: true,
                             },
                             gifsicle: {
                               interlaced: true,
                             },
                             optipng: {
                               optimizationLevel: 7,
                             }
                           }
                         }
                       }]

            }
  ]
},
devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
