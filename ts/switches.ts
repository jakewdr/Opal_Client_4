import { app } from "electron";

export function switches() {
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
