const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    devtool: '#source-map',

    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 9090,
        // proxy: [
        //     {
        //         context: ["/api"],
        //         target: "",
        //     }
        // ],
        hot: true,
        inline: true,
        stats: {
            all: false,
            cached: true,
            env: true,
            errors: true,
            errorDetails: true,
            timings: true,
            version: true,
            warnings: true
        },
        historyApiFallback: true,
        open: false
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
