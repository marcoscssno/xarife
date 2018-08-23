var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    
    entry: './src/client/app.js',

    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/, exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin('dist/client')
    ],
    
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'app.js'
    }
};