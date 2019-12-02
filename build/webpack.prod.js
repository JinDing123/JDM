const commonConfig = require('./webpack.common.js');
const merge = require('webpack-merge');
delete commonConfig.output.publicPath;

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.styl(us)?$/,
                use: [
                    // 开发环境下面是把css文件单独提取出来了，生产环境会自动提取，所以要单独写
                    'vue-style-loader',
                    'css-loader',
                    'stylus-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
    },
    optimization: {},
    plugins: []
};
module.exports = merge(commonConfig, prodConfig);