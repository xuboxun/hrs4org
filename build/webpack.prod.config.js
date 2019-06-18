const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
            })
        ]
    },
    stats: {
        all: undefined,
        children: false, // 不添加 children 信息
        colors: true,
        assetsSort: "chunks",
        warningsFilter: '[mini-css-extract-plugin]',
    },
});
