"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const a=require("electron");var{cpus:n}=require("os");require("v8-compile-cache");const p=e(require("path"));function i(){const{width:e,height:i}=a.screen.getPrimaryDisplay().workAreaSize,o=new a.BrowserWindow({width:e,height:i,webPreferences:{nodeIntegration:!1,nodeIntegrationInWorker:!1,enableRemoteModule:!0,webSecurity:!1,contextIsolation:!1,devTools:!0,sandbox:!1,preload:p.default.join(__dirname,"preload.js"),partition:"persist:evio"},icon:"./icon.ico"});a.app.commandLine.appendSwitch("disable-gpu-vsync"),a.app.commandLine.appendSwitch("disable-frame-rate-limit"),n()[0].model.includes("AMD")&&a.app.commandLine.appendSwitch("enable-zero-copy"),a.app.commandLine.appendSwitch("enable-gpu-rasterization"),a.app.commandLine.appendSwitch("enable-oop-rasterization"),a.app.commandLine.appendSwitch("enable-native-gpu-memory-buffers"),a.app.commandLine.appendSwitch("enable-gpu-memory-buffer-compositor-resources"),a.app.commandLine.appendSwitch("double-buffer-compositing"),a.app.commandLine.appendSwitch("force-gpu-mem-available-mb","1500"),a.app.commandLine.appendSwitch("force-gpu-mem-discardable-limit-mb","500"),a.app.commandLine.appendSwitch("enable-webgl2-compute-context"),a.app.commandLine.appendSwitch("enable-accelerated-2d-canvas"),a.app.commandLine.appendSwitch("use-angle","d3d9"),a.app.commandLine.appendSwitch("raise-timer-frequency"),a.app.commandLine.appendSwitch("disable-background-timer-throttling"),a.app.commandLine.appendSwitch("disable-background-networking"),a.app.commandLine.appendSwitch("enable-quic"),a.app.commandLine.appendSwitch("no-sandbox"),a.app.commandLine.appendSwitch("high-dpi-support","1"),a.app.commandLine.appendSwitch("javascript-harmony"),a.app.commandLine.appendSwitch("disable-v8-idle-tasks"),a.app.commandLine.appendSwitch("enable-future-v8-vm-features"),a.app.commandLine.appendSwitch("v8-cache-options","code"),a.app.commandLine.appendSwitch("enable-experimental-webassembly-features"),a.app.commandLine.appendSwitch("enable-experimental-webassembly-stack-switching"),a.app.commandLine.appendSwitch("disable-renderer-backgrounding"),a.app.commandLine.appendSwitch("disable-2d-canvas-clip-aa"),a.app.commandLine.appendSwitch("disable-features","Vulkan"),a.app.commandLine.appendSwitch("disable-renderer-accessibility"),a.app.commandLine.appendSwitch("disable-composited-antialiasing"),a.app.commandLine.appendSwitch("disable-software-rasterizer"),a.app.commandLine.appendSwitch("disable-software-compositing-fallback"),a.app.commandLine.appendSwitch("disable-gpu-process-crash-limit"),a.app.commandLine.appendSwitch("force_high_performance_gpu"),a.app.commandLine.appendSwitch("use-gpu-in-tests"),a.app.commandLine.appendSwitch("disable-low-end-device-mode"),a.app.commandLine.appendSwitch("disable-backing-store-limit"),a.app.commandLine.appendSwitch("disable-cookie-encryption"),a.app.commandLine.appendSwitch("disable-stack-profiler"),a.app.commandLine.appendSwitch("enable-background-thread-pool"),o.webContents.on("before-input-event",((e,n)=>{"F5"===n.key&&(o.reload(),e.preventDefault()),"F6"===n.key&&(o.loadURL("https://ev.io/"),e.preventDefault()),"F7"===n.key&&(o.loadURL(a.clipboard.readText()),e.preventDefault()),"F8"===n.key&&(o.loadURL("https://ev.io/user/login/"),e.preventDefault()),"F9"===n.key&&a.app.quit(),"F11"===n.key&&(o.setFullScreen(!o.isFullScreen()),e.preventDefault())})),o.removeMenu(),a.session.defaultSession.loadExtension(p.default.join(__dirname,"community-patch")),o.loadURL("https://ev.io/"),"https://ev.io/user/login"!=o.webContents.getURL()&&o.loadURL("https://ev.io/"),o.once("ready-to-show",(()=>{o.show()})),o.on("close",(function(e){e.preventDefault(),o.destroy()}))}a.app.on("window-all-closed",(function(){"darwin"!==process.platform&&a.app.quit()})),a.app.on("ready",(()=>{console.log("App is ready to run"),i()})),a.ipcMain.on("close",((e,n)=>{a.app.quit()}));