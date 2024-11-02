import * as esbuild from "esbuild"

await esbuild.build({
    entryPoints: ["ts/index.ts", "ts/preload.ts"],
    outdir: "js/",
    tsconfig: "tsconfig.json",
    target: ["node16"],
    packages: 'external',
    platform: "node",

    bundle: true,
    minify: true,
    ignoreAnnotations: true


})