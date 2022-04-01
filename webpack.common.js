const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const folderName = 'Custom';

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        path: path.join(__dirname, 'AppHtml', folderName),
        publicPath: folderName + '/'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new ESLintPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
};