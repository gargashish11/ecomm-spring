const path = require('path')
const webpack = require('webpack');
const common = require("./webpack.common")
const merge = require("webpack-merge").merge;
const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;

module.exports = merge(common, {
    mode: "development",
    devtool: 'source-map',
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: path.join(__dirname, 'src/main/resources/static'),
            publicPath: 'http://localhost:9000',
        },
        proxy: {
            '/**': {
                target: 'http://localhost:8080',
                secure: false,
            },
        },
        port: 9000
    },
    plugins: [
        new WatchExternalFilesPlugin({
            files: ['./target/classes/**/*'],
        })
    ],
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true,
    },
});
