import { app, BrowserWindow } from 'electron';

let mainWindow;

// Log Electron app lifecycle events
app.on('ready', () => {
    console.log('App is ready');

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        show: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    console.log('BrowserWindow created');

    // Load the appropriate path
    const indexPath = 'https://mercury-ai.vercel.app/';

    console.log(`Loading URL: ${indexPath}`);

    mainWindow.loadURL(indexPath).catch((err) => {
        console.error('Failed to load the development server:', err);
    });

    mainWindow.webContents.openDevTools(); // Open DevTools for debugging
});

// Log window-all-closed event
app.on('window-all-closed', () => {
    console.log('All windows are closed');
    if (process.platform !== 'darwin') {
        console.log('Quitting app');
        app.quit();
    }
});

// Log errors and warnings
app.on('before-quit', () => {
    console.log('App is about to quit');
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});
