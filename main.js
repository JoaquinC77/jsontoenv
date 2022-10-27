const { BrowserWindow, app } = require('electron')
const { setMainMenu } = require('./menu')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    minHeight: 900,
    minWidth: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  setMainMenu(mainWindow)
}
app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})
