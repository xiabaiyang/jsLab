module.exports = {
    entry: './main.js',
    output: {
        filename: 'app.js'
    },
    watch: true,
    loaders: [{
        test: /\.css$/,
        loader: 'style!css'
    }],
    externals: {
        'angular': true
    }
};