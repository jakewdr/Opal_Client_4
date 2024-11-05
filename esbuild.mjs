import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["ts/index.ts", "ts/preload.ts"],
    outdir: "out/",
    format: "cjs",
    tsconfig: "tsconfig.json",
    target: ["node16"],
    external: ["electron"],
    platform: "node",
    bundle: true,
    minify: true,
    ignoreAnnotations: true,
});
