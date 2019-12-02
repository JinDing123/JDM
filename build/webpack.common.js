const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/main.js'),
    },
    resolve: {
        extensions: ['.js', '.vue'],
        mainFiles: ['index'],
        alias: {
            routes: path.resolve(__dirname, '../routes'),
            components: path.resolve(__dirname, '../src/components'),
            src: path.resolve(__dirname, '../src'),
            store: path.resolve(__dirname, '../store'),
            util: path.resolve(__dirname, '../utils'),
            pages: path.resolve(__dirname, '../src/pages'),
            models: path.resolve(__dirname, '../Models')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash:8].[ext]',
                        outputPath: 'images/',
                        limit: 2048,
                    }
                },
            },
            {
                test: /\.(eot|ttf|svg|woff)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 你原路径是什么，打包的地址就是什么，你原路径是在font/， 所以打包出来的也要到font/
                        outputPath: 'font/',
                    }
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/public/'
    },
}