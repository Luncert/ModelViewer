import { app, BrowserWindow, Menu, ipcMain, Tray, dialog, session } from 'electron'
import { Channels, WINDOW_STATE } from '../common/Constants'
import path from 'path'
import url from 'url'
import ResourceServer from './ResourceServer'


const isDevelopment = process.env.NODE_ENV !== 'production'

const MIN_WIDTH = 800, MIN_HEIGHT = 500

let mainWindow: Electron.BrowserWindow
let tray: Tray

function fetchWindowState() {
  if (mainWindow.isFullScreen()) {
      return WINDOW_STATE.FULLSCREEN;
  }
  if (mainWindow.isMaximized()) {
      return WINDOW_STATE.MAXIMIZED;
  }
  if (mainWindow.isMinimized()) {
      return WINDOW_STATE.MINIMIZED;
  }
  if (!mainWindow.isVisible()) {
      return WINDOW_STATE.HIDDEN;
  }
  return WINDOW_STATE.NORMAL;
}

function createWindow() {
  // let mainWindowState = windowStateKeeper({
  //   defaultWidth: MIN_WIDTH,
  //   defaultHeight: MIN_HEIGHT
  // })

  mainWindow = new BrowserWindow({
    // x: mainWindowState.x,
    // y: mainWindowState.y,
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT,
    // TODO:
    // icon: 'C:\\Workspace\\Project\\Terminal\\dist\\7d11471c8247c18db75a3ceb5237b2f3.ico',
    resizable: true,
    frame: false,
    fullscreenable: true,
    // hasShadow: false, // doesn't work
    transparent: false,
    alwaysOnTop: false,
    useContentSize: false,
    // icon: require('../../res/icon.png').default,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  // mainWindowState.manage(mainWindow)
  // mainWindow.setThumbnailClip({x: 0, y: 0, width: 240, height: 40}) TODO:
  mainWindow.webContents.openDevTools()
  Menu.setApplicationMenu(null)

  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  setupMessageChannels()
}

function setupMessageChannels() {
  ipcMain.on(Channels.DoLog, (event, ...args) => {
    console.log(args)
  })
  // listen window control event
  ipcMain.on(Channels.FetchWindowState, (event) => {
    event.returnValue = fetchWindowState();
  })
  ipcMain.on(Channels.MinimizeWindow, (event) => {
    if (mainWindow.minimizable) {
      mainWindow.minimize()
    }
    event.returnValue = fetchWindowState()
  })
  ipcMain.on(Channels.MaximizeWindow, (event) => {
    if (mainWindow.maximizable) {
      mainWindow.maximize()
    }
    event.returnValue = fetchWindowState()
  })
  ipcMain.on(Channels.UnmaximizeWindow, (event) => {
    mainWindow.unmaximize();
    event.returnValue = fetchWindowState()
  })
  ipcMain.on(Channels.CloseWindow, (event) => {
    mainWindow.close()
    event.returnValue = WINDOW_STATE.HIDDEN
  })
  ipcMain.on(Channels.OpenFile, async (event) => {
    let ret = await dialog.showOpenDialog({
      title: 'Open Model File',
      filters: [{name: 'Model Files', extensions: ['obj', 'fbx', 'gltf', 'json']}],
      properties: ['openFile']}
    )
    event.returnValue = ret.filePaths
  })
  
  // listener window event
  // mainWindow.on('restore', () => {
  // })
  // listen accelerator
  // globalShortcut.register('CommandOrControl+Tab', () => {
  //   mainWindow.webContents.send(Channels.SwitchTag)
  // })
}

function initTrayIcon() {
  // tray = new Tray('C:\\Workspace\\Project\\Terminal\\src\\assets\\icon64_64.ico')
  // const trayCtxMenu = Menu.buildFromTemplate([
  //   {
  //     label: 'open',
  //     click: () => {
  //       console.log('open')
  //     }
  //   }
  // ])
  // tray.setToolTip('Terminal')
  // tray.on('click', () => {
  //   console.log('click')
  // })
  // tray.on('right-click', () => {
  //   tray.popUpContextMenu(trayCtxMenu);
  // });
}

function setupResourceServer() {
  const server = new ResourceServer()
  session.defaultSession.setProxy(server.getProxy())
  server.start()
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    createWindow()
  }
})
// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createWindow()
  initTrayIcon()
  setupResourceServer()
})

app.commandLine.appendSwitch('high-dpi-support', 'true');
// app.commandLine.appendSwitch('force-device-scale-factor', '1');
app.allowRendererProcessReuse = true