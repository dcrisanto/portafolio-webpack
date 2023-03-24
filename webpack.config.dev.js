// disponible en node por lo que no es necesario realizar instalación de dependencias
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // punto de entrada de la aplicacion
  entry: './src/index.js',
  // output: hacia donde vamos a enviar lo que va a preparar webpack
  output: {
    // resolve nos permite saber en que directorio se encuentra nuestro proyecto. dist: path donde se guardará nuestro proyecto
    path: path.resolve(__dirname, 'dist'),
    // js que se unificará
    //filename: 'main.js',
    //optimización para identificar las versiones que estamos tranbajando: identificamos cada bild con un hash
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  watch: true,
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, './src/templates/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@images': path.resolve(__dirname, './src/assets/images/')
    }
  },
  module: {
    rules: [
      {
        //que tipo de extensiones voy a trabajar. Cualquier archivo que empiece con m(module, extension mjs) o js
        test: /\.m?js$/,
        //excluir los node modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i, //leerá todos los archivos css y styls
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            //hash
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "./assets/fonts",
            esModule: false,
          },
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      //insercción de los elementos
      inject: true,
      template: './public/index.html',
      // toma nuestro template y lo va a transformar con los elementos que le vamos a indicar y lo va a colocar en la carpeta de distribución con el nombre index.html
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
  ],
}
