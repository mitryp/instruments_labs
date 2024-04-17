const path = require('path');

module.exports = {
    entry: 'index.js',
    resolve: {
        modules: ['js', 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};