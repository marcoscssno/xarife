var path = require('path');
var nodeExternals = require('webpack-node-externals');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/server/server.js',

    target: 'node',

    node: {
        __dirname: false,
        __filename: false
    },

    externals: [nodeExternals()],

    mode: 'production',

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },

    plugins: [
        new CleanWebpackPlugin('dist/server')
    ],
    
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'server.js'
    }
};