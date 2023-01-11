import { app, BrowserWindow, session, screen, clipboard, ipcMain} from "electron";
var { cpus } = require("os");
import 'v8-compile-cache'
import path from "path";

function switches () {
  
  // Uncapped fps ->

  app.commandLine.appendSwitch("disable-gpu-vsync");
  app.commandLine.appendSwitch("disable-frame-rate-limit");
  if (cpus()[0].model.includes("AMD")) {
    app.commandLine.appendSwitch("enable-zero-copy");
  }
  
  // GPU -> 

  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch('enable-oop-rasterization');
  app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
  app.commandLine.appendSwitch('enable-gpu-memory-buffer-compositor-resources');
  app.commandLine.appendSwitch('double-buffer-compositing'); 
  app.commandLine.appendSwitch("force-gpu-mem-available-mb", '1500');
  app.commandLine.appendSwitch("force-gpu-mem-discardable-limit-mb", '500');
  app.commandLine.appendSwitch('enable-webgl2-compute-context');
  app.commandLine.appendSwitch('enable-accelerated-2d-canvas');
  app.commandLine.appendSwitch('use-angle', 'd3d9');
  
  // Timer ->

  app.commandLine.appendSwitch("raise-timer-frequency");
  app.commandLine.appendSwitch("disable-background-timer-throttling");

  // Networking ->

  app.commandLine.appendSwitch("disable-background-networking");
  app.commandLine.appendSwitch("enable-quic");

  //General ->

  app.commandLine.appendSwitch("no-sandbox");
  app.commandLine.appendSwitch('high-dpi-support','1');
  app.commandLine.appendSwitch('javascript-harmony');

  // v8 ->

  app.commandLine.appendSwitch("disable-v8-idle-tasks");
  app.commandLine.appendSwitch('enable-future-v8-vm-features');
  app.commandLine.appendSwitch("v8-cache-options","code");

  // WASM ->

  app.commandLine.appendSwitch("enable-experimental-webassembly-features");
  app.commandLine.appendSwitch("enable-experimental-webassembly-stack-switching");
  
  // Background processes ->
 
  app.commandLine.appendSwitch("disable-renderer-backgrounding");
  app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
  app.commandLine.appendSwitch('disable-features', 'Vulkan');
  app.commandLine.appendSwitch('disable-renderer-accessibility');
  app.commandLine.appendSwitch('disable-composited-antialiasing');

  // Forcing the game to use GPU only! ->

  app.commandLine.appendSwitch('disable-software-rasterizer');
  app.commandLine.appendSwitch('disable-software-compositing-fallback');
  app.commandLine.appendSwitch('disable-gpu-process-crash-limit');
  app.commandLine.appendSwitch('force_high_performance_gpu');
  app.commandLine.appendSwitch('use-gpu-in-tests');
  app.commandLine.appendSwitch('disable-low-end-device-mode');
  
  // Misc ->

  app.commandLine.appendSwitch("disable-backing-store-limit");
  app.commandLine.appendSwitch("disable-cookie-encryption");
  app.commandLine.appendSwitch("disable-stack-profiler");
  app.commandLine.appendSwitch("enable-background-thread-pool");
  
}

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

  switches();
 
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
  session.defaultSession.loadExtension(path.join(__dirname, "community-patch"));
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
