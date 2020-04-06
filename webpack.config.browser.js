const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dist = path.resolve(__dirname, 'app', 'dist')
const browser = path.resolve(__dirname, 'browser')

module.exports = {
    entry: path.resolve('browser', 'index.jsx'),
    target: 'electron-renderer',
    output: {
        filename: 'index.bundle.js',
        path: dist
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(browser, 'components'),
            '@views': path.resolve(browser, 'pages')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: require('./app/dist/renderer.manifest.json'),
            sourceType: 'var'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(browser, 'template.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
  
}