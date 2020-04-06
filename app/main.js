const {app, BrowserWindow} = require('electron')
const path = require('path')


require('electron-reload')(path.resolve(__dirname, 'dist'))

let win = null

function createWindow () {   
    let win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    win.loadFile(path.resolve(__dirname, 'dist', 'index.html'))
  }
  
app.whenReady().then(createWindow)