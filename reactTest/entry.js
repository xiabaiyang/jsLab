var path = require('path');

module.exports = {
    entry: './entry.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    // resolve可以指定被import的文件后缀
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        // loader可以指定babel-loader编译后缀名为.js或者.jsx的文件
        loaders: [
            {test: /\.js|jsx$/, loaders: ['babel']}
        ]
    }
};