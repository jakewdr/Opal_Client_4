import { BrowserWindow, app, clipboard, screen } from "electron";
import "v8-compile-cache";
import path from "path";
import { switches } from "./switches";

export function primaryWindow() {
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
