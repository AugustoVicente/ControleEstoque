// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
require('electron-reload')(__dirname);
let mainWindow;
function createWindow () 
{
	// Create the browser window.
	mainWindow = new BrowserWindow(
	{
		width: 800, 
		height: 700
	})
	// mainWindow.maximize();
	mainWindow.setMenu(null);
	// and load the index.html of the app.
	mainWindow.loadFile('index.html')
	// mainWindow.webContents.openDevTools()
	// Emitted when the window is closed.
	mainWindow.on('closed', function () 
	{
		mainWindow = null
	})
	
}
app.on('ready', createWindow)
app.on('window-all-closed', function () 
{
	if (process.platform !== 'darwin') 
	{
		app.quit();
	}
})
app.on('activate', function () 
{
	if (mainWindow === null) 
	{
		createWindow()
	}
})