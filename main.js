const { app, shell, BrowserWindow } = require("electron");
const windowStateKeeper = require('electron-window-state');
let win;

function createWindow () {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1400,
    defaultHeight: 800
  });
  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      enableRemoteModule: false
    }
  })

  // Retains size and position of window
  mainWindowState.manage(win);	
  // Removes the menu
  win.removeMenu();
  win.loadURL('https://coronupdate.mavodev.de');

  // Opens link in default browser
  win.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich, für Apps und ihre Menu Bar
  // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})