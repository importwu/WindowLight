const path = require('path')
const {spawn} = require('child_process')
const {watch, parallel, series} = require('gulp')
const webpack = require('webpack')
const electron = require('electron')

function build_dll(done) {
    const complier = webpack(require('./webpack.config.dll'))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build dll is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}

function build_browser(done) {
    const complier = webpack(require('./webpack.config.browser'))

    complier.run((err, stats) => {
        if(stats.hasErrors()) {
            console.log('build browser is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}

function start_electron(done) {
    const app = path.resolve(__dirname, 'app', 'main.js')

    electron_process = spawn(electron, [app], {shell: process.platform === 'win32'})

    electron_process.on('close', () => {
        console.log('exit electron app')
    })
    done()
}

function watch_browser(done) {
    const complier = webpack(require('./webpack.config.browser'))

    complier.watch({},(err, stats) => {
        if(stats.hasErrors()) {
            console.log('build browser is failed.')
        }
        console.log(stats.toString({assets: true}))
        done()
    })
}

module.exports = {
    build_dll,
    build_browser,
    start_electron,
    watch_browser
}