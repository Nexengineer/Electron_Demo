import { app, BrowserWindow, ipcMain } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import fs from 'fs';

let mainWindow;
const isDevMode = process.execPath.match(/[\\/]electron/);
const ipc = ipcMain

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 900,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        //mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipc.on('print-to-pdf',function (event) {
    const pdfPath = path.join(__dirname, '/reports/print.pdf')
    const win = BrowserWindow.fromWebContents(event.sender)
    win.webContents.printToPDF({printBackground: true, landscape: true}, function (error, data) {
      if (error) throw error
      fs.writeFile(pdfPath, file, function (error) {
        if (error) {
          throw error
        }
        shell.openExternal('file://' + pdfPath)
        event.sender.send('wrote-pdf', pdfPath)
      })
    })
  })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.