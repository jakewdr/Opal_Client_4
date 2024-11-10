import packager from "electron-packager"

let packagerOptions =  {
    name: "OpalClient",

    platform: "win32",
    arch: "x64",
    dir: ".",
    out: "dist",
    icon: "icon.ico",

    asar: true,
    overwrite: true,
    prune: true,

    ignore: [
        ".github",
        "dist",
        "ts",
        ".gitignore",
        "biome.json",
        "esbuild.mjs",
        "icon.ico",
        "LICENSE",
        "packager.mjs",
        "tsconfig.json",
        "README.md",
        "yarn.lock"
    ],
}

async function buildElectronApp(packagerOptions) {
    packager(packagerOptions)
}

buildElectronApp(packagerOptions)