const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      template: "./src/app/homepage.html"
    }),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ]
  },

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ],
  },
};
