var path = require('path');

module.exports = {
    mode: 'production',
    
    entry: './src/client/app.js',

    module: {
        rules: [
            { test: /\.css$/, include: NODE_MODULES_FOLDER, loaders: ['style-loader, css-loader'] },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: 'app.js'
    }
};