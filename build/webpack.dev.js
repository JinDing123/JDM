const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devConfig = {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map',
    devServer: {
        contentBase: 'dist/',
        hot: true,
        hotOnly: true,
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
            '/api': {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    optimization: {
        usedExports: true, 
        splitChunks: {
            chunks: 'all',  
        }
    },
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader', 
                    'css-loader',
                    'stylus-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { 
                            hmr: true,
                            reloadAll: true
                        }
                    },
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', 
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
    ]
};
module.exports = merge(commonConfig, devConfig);