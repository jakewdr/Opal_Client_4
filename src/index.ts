import { app, BrowserWindow, session, screen, clipboard} from "electron";
import path from "path";
require('v8-compile-cache');

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
      sandbox: false
    },
  });
  
  session.defaultSession.loadExtension(path.join(__dirname, "community-patch"));

  // Video ->

  app.commandLine.appendSwitch("disable-gpu-vsync");
  app.commandLine.appendSwitch("disable-frame-rate-limit");
  app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
  app.commandLine.appendSwitch("double-buffer-compositing");
  app.commandLine.appendSwitch("force_high_performance_gpu");
  app.commandLine.appendSwitch("max-gum-fps=9999");

  // Audio ->

  app.commandLine.appendSwitch("alsa-enable-upsampling");
  app.commandLine.appendSwitch("audio-process-high-priority");
  app.commandLine.appendSwitch("enable-exclusive-audio");

  // Networking ->

  app.commandLine.appendSwitch("disable-background-networking");
  app.commandLine.appendSwitch("enable-quic");

  //General ->

  app.commandLine.appendSwitch("no-sandbox-and-elevated");
  app.commandLine.appendSwitch("disable-low-end-device-mode");
  app.commandLine.appendSwitch("ignore-gpu-blacklist");

  // Input ->

  app.commandLine.appendSwitch("allow-pre-commit-input");
  app.commandLine.appendSwitch("disable-third-party-keyboard-workaround");

  // Unnecessary Stuff ->

  app.commandLine.appendSwitch("disable-breakpad");
  app.commandLine.appendSwitch("disable-component-update");
  app.commandLine.appendSwitch("disable-print-preview");
  app.commandLine.appendSwitch("disable-metrics");
  app.commandLine.appendSwitch("disable-metrics-repo");
  app.commandLine.appendSwitch("disable-speech-api");
  app.commandLine.appendSwitch("disable-web-security");
  app.commandLine.appendSwitch("disable-hang-monitor");
  app.commandLine.appendSwitch("ignore-gpu-blacklist");
  app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
  app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
  app.commandLine.appendSwitch("disable-logging");
  app.commandLine.appendSwitch("disable-web-security");
  app.commandLine.appendSwitch("disable-renderer-backgrounding");
  app.commandLine.appendSwitch("disable-background-timer-throttling");
  app.commandLine.appendSwitch("disable-backing-store-limit");
 
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

 win.once("ready-to-show", () => {
    win.show();
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

