const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    entry: './js/main.js',
    output: {
        filename: "./js/all.min.js",
        path: path.resolve(__dirname, 'src/main/resources/static'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'js'),
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            workers: 10,
                            poolRespawn: false,
                        }
                    },
                    'babel-loader'
                ]
            },
            {
                test: /\.(bootstrap-icons.w*)/i,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[base]"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "webfonts/[base]"
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '(j|cs)s/**',
                'webfonts/**',
                '!images/**',
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "./css/style.min.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
        })],
}