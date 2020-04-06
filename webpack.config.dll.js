const path = require('path')
const webpack = require('webpack')

const dist = path.resolve(__dirname, 'app', 'dist')

module.exports = {
    target: 'electron-renderer',
    entry: {
        'renderer': ['react', 'react-dom', 'antd']
    },
    output: {
        filename: '[name].dll.js',
        path: dist,
        library: '[name]_[hash]_dll',
        libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(dist, '[name].manifest.json'),
            name: '[name]_[hash]_dll'
        })
    ]
}
