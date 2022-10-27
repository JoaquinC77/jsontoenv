const { app, Menu } = require('electron')

const setMainMenu = (mainWindow) => {
  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: 'Themes',
          submenu: [
            {
              label: 'light',
              click: () => {
                mainWindow.webContents.send('update-theme', 'light')
              }
            },
            {
              label: 'dark',
              click: () => {
                mainWindow.webContents.send('update-theme', 'dark')
              }
            }
          ]
        },
        { role: 'quit' }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
module.exports = {
  setMainMenu
}
