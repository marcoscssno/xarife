var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/client/app.js',

    mode: 'production',

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'app.js'
    }
};