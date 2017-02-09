const webpack = require('webpack');

module.exports = {
    entry: `${__dirname}/js/index.js`,
    output: {
        path: `${__dirname}/dist/`,
        filename: 'bundle.js',
        moduleFilenameTemplate        : '[absolute-resource-path]',
        fallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    devtool: 'cheap-module-source-map', // enable source maps
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|libraries/,
                loaders: ['babel?presets[]=latest', 'eslint?fix=true']
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}