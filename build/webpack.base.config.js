const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(c|sc)ss$/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(gif|jpg|jpeg|png|ico|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: './src/assets/favicon.ico',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' },
        ]),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name: 'styles',
                    test: /\.(css|scss)$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        }
    }
};
