"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
require('v8-compile-cache');
function primaryWindow() {
    const { width, height } = electron_1.screen.getPrimaryDisplay().workAreaSize;
    const win = new electron_1.BrowserWindow({
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
    electron_1.session.defaultSession.loadExtension(path_1.default.join(__dirname, "community-patch"));
    electron_1.app.commandLine.appendSwitch("disable-gpu-vsync");
    electron_1.app.commandLine.appendSwitch("disable-frame-rate-limit");
    electron_1.app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
    electron_1.app.commandLine.appendSwitch("double-buffer-compositing");
    electron_1.app.commandLine.appendSwitch("force_high_performance_gpu");
    electron_1.app.commandLine.appendSwitch("max-gum-fps=9999");
    electron_1.app.commandLine.appendSwitch("alsa-enable-upsampling");
    electron_1.app.commandLine.appendSwitch("audio-process-high-priority");
    electron_1.app.commandLine.appendSwitch("enable-exclusive-audio");
    electron_1.app.commandLine.appendSwitch("disable-background-networking");
    electron_1.app.commandLine.appendSwitch("enable-quic");
    electron_1.app.commandLine.appendSwitch("no-sandbox-and-elevated");
    electron_1.app.commandLine.appendSwitch("disable-low-end-device-mode");
    electron_1.app.commandLine.appendSwitch("ignore-gpu-blacklist");
    electron_1.app.commandLine.appendSwitch("allow-pre-commit-input");
    electron_1.app.commandLine.appendSwitch("disable-third-party-keyboard-workaround");
    electron_1.app.commandLine.appendSwitch("disable-breakpad");
    electron_1.app.commandLine.appendSwitch("disable-component-update");
    electron_1.app.commandLine.appendSwitch("disable-print-preview");
    electron_1.app.commandLine.appendSwitch("disable-metrics");
    electron_1.app.commandLine.appendSwitch("disable-metrics-repo");
    electron_1.app.commandLine.appendSwitch("disable-speech-api");
    electron_1.app.commandLine.appendSwitch("disable-web-security");
    electron_1.app.commandLine.appendSwitch("disable-hang-monitor");
    electron_1.app.commandLine.appendSwitch("ignore-gpu-blacklist");
    electron_1.app.commandLine.appendSwitch("disable-2d-canvas-clip-aa");
    electron_1.app.commandLine.appendSwitch("disable-bundled-ppapi-flash");
    electron_1.app.commandLine.appendSwitch("disable-logging");
    electron_1.app.commandLine.appendSwitch("disable-web-security");
    electron_1.app.commandLine.appendSwitch("disable-renderer-backgrounding");
    electron_1.app.commandLine.appendSwitch("disable-background-timer-throttling");
    electron_1.app.commandLine.appendSwitch("disable-backing-store-limit");
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
            win.loadURL(electron_1.clipboard.readText());
            event.preventDefault();
        }
        if (input.key === "F8") {
            win.loadURL("https://ev.io/user/login/");
            event.preventDefault();
        }
        if (input.key === "F9") {
            electron_1.app.quit();
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
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("ready", () => {
    console.log("App is ready to run");
    primaryWindow();
});
//# sourceMappingURL=index.js.map