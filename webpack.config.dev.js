var webpack = require('webpack');
var path = require('path');

var ENTRY_FILE = path.resolve(__dirname, 'src/client/app.js');
var NODE_MODULES_FOLDER = path.resolve(__dirname, 'node_modules');
var OUTPUT_PATH = path.resolve(__dirname, 'dist/client');

module.exports = {
    mode: 'development',
    
    entry: [
        'webpack-hot-middleware/client',
        ENTRY_FILE
    ],
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { test: /\.js$/, exclude: NODE_MODULES_FOLDER, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: NODE_MODULES_FOLDER, loader: "babel-loader" }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    
    output: {
        path: OUTPUT_PATH,
        filename: 'app.js'
    }
};