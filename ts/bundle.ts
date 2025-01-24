import { app, ipcMain } from "electron";
import { primaryWindow } from "./main";

app.on("ready", () => {
    console.log("Client is ready to run");
    primaryWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("close", () => {
    app.quit();
});
