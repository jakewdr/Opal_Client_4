var t=require("electron");function n(e){e.preventDefault(),t.ipcRenderer.send("close")}t.ipcRenderer.on("menu",()=>{document.getElementById("menu_hotkey_top").click()});document.addEventListener("DOMContentLoaded",()=>{document.getElementById("ClientExit")||(document.getElementById("top_bar_cont").innerHTML+=`
    <button type="button" id="ClientExit" class="btn btn-secondary btn-sm" style="position: absolute; left: 0; top: 0; width: 100px !important">Exit</button>
    `),document.getElementById("ClientExit").addEventListener("click",n)});
