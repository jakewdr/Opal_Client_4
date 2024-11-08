import { BrowserWindow, app, clipboard, ipcMain, screen } from "electron";
import "v8-compile-cache";
import path from "path";

function primaryWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: false,
            webSecurity: false,
            contextIsolation: false,
            devTools: false,
            sandbox: false,
            preload: path.join(__dirname, "preload.js"),
            partition: "persist:evio",
        },
        icon: "./icon.ico",
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
            app.quit();
        }
        if (input.key === "F11") {
            win.setFullScreen(!win.isFullScreen());
            event.preventDefault();
        }
    });

    win.removeMenu();
    win.loadURL("https://ev.io");
    win.once("ready-to-show", () => {
        win.show();
    });

    win.on("close", (e) => {
        e.preventDefault();
        win.destroy();
        return;
    });
}

function switches() {
    const chromiumSwitches = [
        // GPU ->

        "enable-accelerated-2d-canvas",
        "disable-gpu-vsync",
        "disable-software-rasterizer",
        "disable-renderer-backgrounding",
        "disable-software-compositing-fallback",
        "disable-gpu-process-crash-limit",
        "force-gpu-rasterization",
        "disable-frame-rate-limit",
        "disable-2d-canvas-clip-aa",
        "enable-skia-graphite",

        // Networking ->

        "disable-background-networking",
        "enable-quic",

        // V8 ->

        "disable-v8-idle-tasks",
        "enable-future-v8-vm-features",

        // MISC ->

        "no-sandbox",
        "disable-backing-store-limit",
    ];

    for (let i = 0, length = chromiumSwitches.length; i < length; i++) {
        app.commandLine.appendSwitch(chromiumSwitches[i]);
    }

    // Double argument ones ->

    app.commandLine.appendSwitch("use-angle", "OpenGL");
    app.commandLine.appendSwitch("high-dpi-support", "1");
    app.commandLine.appendSwitch("v8-cache-options", "code");

    app.commandLine.appendSwitch("canvas-msaa-sample-count", "0");
    app.commandLine.appendSwitch("ebgl-antialiasing-mode", "none");

    console.log("Flags applied");
}

app.on("ready", () => {
    console.log("Client is ready to run");
    primaryWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("close", (event, arg) => {
    app.quit();
});
