import { app, BrowserWindow, session, screen, clipboard, ipcMain} from "electron";
import os from 'os';
import 'v8-compile-cache'
import path from "path";

function primaryWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      enableRemoteModule: true,
      webSecurity: false,
      contextIsolation: false,
      devTools: true,
      sandbox: false,
      preload: path.join(__dirname, 'preload.js'),
      partition: 'persist:evio'
    },
    icon: './icon.ico',
  });
  
  session.defaultSession.loadExtension(path.join(__dirname, "community-patch"));

  // Uncapped fps ->

  app.commandLine.appendSwitch("disable-gpu-vsync");
  app.commandLine.appendSwitch("disable-frame-rate-limit");
  if (os.cpus()[0].model.indexOf("AMD") > -1) app.commandLine.appendSwitch('enable-zero-copy');

  // GPU -> 

  app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
  app.commandLine.appendSwitch('enable-webgl2-compute-context');
  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch("ignore-gpu-blacklist");

  // Networking ->

  app.commandLine.appendSwitch("disable-background-networking");
  app.commandLine.appendSwitch("enable-quic");

  //General ->

  app.commandLine.appendSwitch("no-sandbox");
  app.commandLine.appendSwitch('high-dpi-support');

  // Unnecessary Stuff ->

  app.commandLine.appendSwitch("disable-breakpad");
  app.commandLine.appendSwitch("disable-component-update");
  app.commandLine.appendSwitch("disable-print-preview");
  app.commandLine.appendSwitch("disable-metrics");
  app.commandLine.appendSwitch("disable-metrics-repo");
  app.commandLine.appendSwitch("disable-speech-api");
  app.commandLine.appendSwitch("disable-web-security");
  app.commandLine.appendSwitch("disable-hang-monitor");
  app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
  app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
  app.commandLine.appendSwitch("disable-logging");
  app.commandLine.appendSwitch("disable-renderer-backgrounding");
  app.commandLine.appendSwitch("disable-background-timer-throttling");
  app.commandLine.appendSwitch("disable-backing-store-limit");
  app.commandLine.appendSwitch("disable-web-security", "true")
 
  win.webContents.on("before-input-event", (event, input) => {
  if (input.key === "F5") {
      win.reload();
      event.preventDefault();
    }
  if (input.key === "F6") {
      win.loadURL("https://ev.io/");
      event.preventDefault();
    }
  if (input.key === "F7") {
      win.loadURL(clipboard.readText());
      event.preventDefault();
    }
  if (input.key === "F8") {
      win.loadURL("https://ev.io/user/login/");
      event.preventDefault();
    }
  if (input.key === "F9") {
      app.quit()
    }
  if (input.key === "F11") {
      win.setFullScreen(!win.isFullScreen());
      event.preventDefault();
    }
  });

  win.removeMenu();
  win.loadURL("https://ev.io/");
  let currentURL = win.webContents.getURL();
  currentURL == "https://ev.io/user/login" ? null : win.loadURL('https://ev.io/');
 win.once("ready-to-show", () => {
    win.show();
  });

  win.on('close', function(e) { 
    e.preventDefault();
    win.destroy();
    return;
});
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  console.log("App is ready to run");
  primaryWindow();
});

ipcMain.on('close', (event, arg) => {
  app.quit();
})
