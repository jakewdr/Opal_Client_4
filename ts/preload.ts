import { ipcRenderer } from "electron";

function closeApp(e: { preventDefault: () => void }) {
    e.preventDefault();
    ipcRenderer.send("close");
}

ipcRenderer.on("menu", () => {
    document.getElementById("menu_hotkey_top").click();
});

document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("ClientExit")) {
        document.getElementById("top_bar_cont").innerHTML += `
    <button type="button" id="ClientExit" class="btn btn-secondary btn-sm" style="position: absolute; left: 0; top: 0; width: 100px !important">Exit</button>
    `;
    }

    document.getElementById("ClientExit").addEventListener("click", closeApp);
});

// https://github.com/PandasMagic/Comp-Client/blob/main/preload.js <- Source
