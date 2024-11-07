var q=Object.create;var w=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var A=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var z=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var K=(i,e,t,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of P(e))!j.call(i,r)&&r!==t&&w(i,r,{get:()=>e[r],enumerable:!(s=x(e,r))||s.enumerable});return i};var S=(i,e,t)=>(t=i!=null?q(A(i)):{},K(e||!i||!i.__esModule?w(t,"default",{value:i,enumerable:!0}):t,i));var k=z((W,O)=>{"use strict";var l=require("module"),I=require("crypto"),h=require("fs"),d=require("path"),C=require("vm"),R=require("os"),p=Object.prototype.hasOwnProperty,m=class{constructor(e,t){let s=t?F(t+"."):"";this._blobFilename=d.join(e,s+"BLOB"),this._mapFilename=d.join(e,s+"MAP"),this._lockFilename=d.join(e,s+"LOCK"),this._directory=e,this._load()}has(e,t){return p.call(this._memoryBlobs,e)?this._invalidationKeys[e]===t:p.call(this._storedMap,e)?this._storedMap[e][0]===t:!1}get(e,t){if(p.call(this._memoryBlobs,e)){if(this._invalidationKeys[e]===t)return this._memoryBlobs[e]}else if(p.call(this._storedMap,e)){let s=this._storedMap[e];if(s[0]===t)return this._storedBlob.slice(s[1],s[2])}}set(e,t,s){this._invalidationKeys[e]=t,this._memoryBlobs[e]=s,this._dirty=!0}delete(e){p.call(this._memoryBlobs,e)&&(this._dirty=!0,delete this._memoryBlobs[e]),p.call(this._invalidationKeys,e)&&(this._dirty=!0,delete this._invalidationKeys[e]),p.call(this._storedMap,e)&&(this._dirty=!0,delete this._storedMap[e])}isDirty(){return this._dirty}save(){let e=this._getDump(),t=Buffer.concat(e[0]),s=JSON.stringify(e[1]);try{D(this._directory),h.writeFileSync(this._lockFilename,"LOCK",{flag:"wx"})}catch{return!1}try{h.writeFileSync(this._blobFilename,t),h.writeFileSync(this._mapFilename,s)}finally{h.unlinkSync(this._lockFilename)}return!0}_load(){try{this._storedBlob=h.readFileSync(this._blobFilename),this._storedMap=JSON.parse(h.readFileSync(this._mapFilename))}catch{this._storedBlob=Buffer.alloc(0),this._storedMap={}}this._dirty=!1,this._memoryBlobs={},this._invalidationKeys={}}_getDump(){let e=[],t={},s=0;function r(a,n,c){e.push(c),t[a]=[n,s,s+c.length],s+=c.length}for(let a of Object.keys(this._memoryBlobs)){let n=this._memoryBlobs[a],c=this._invalidationKeys[a];r(a,c,n)}for(let a of Object.keys(this._storedMap)){if(p.call(t,a))continue;let n=this._storedMap[a],c=this._storedBlob.slice(n[1],n[2]);r(a,n[0],c)}return[e,t]}},_=class{constructor(){this._cacheStore=null,this._previousModuleCompile=null}setCacheStore(e){this._cacheStore=e}install(){let e=this,t=typeof require.resolve.paths=="function";this._previousModuleCompile=l.prototype._compile,l.prototype._compile=function(s,r){let a=this;function n(f){return a.require(f)}function c(f,b){return l._resolveFilename(f,a,!1,b)}n.resolve=c,t&&(c.paths=function(b){return l._resolveLookupPaths(b,a,!0)}),n.main=process.mainModule,n.extensions=l._extensions,n.cache=l._cache;let y=d.dirname(r),u=e._moduleCompile(r,s),v=[a.exports,n,a,r,y,process,global,Buffer];return u.apply(a.exports,v)}}uninstall(){l.prototype._compile=this._previousModuleCompile}_moduleCompile(e,t){var s=t.length;if(s>=2&&t.charCodeAt(0)===35&&t.charCodeAt(1)===33)if(s===2)t="";else{for(var r=2;r<s;++r){var a=t.charCodeAt(r);if(a===10||a===13)break}r===s?t="":t=t.slice(r)}var n=l.wrap(t),c=I.createHash("sha1").update(t,"utf8").digest("hex"),y=this._cacheStore.get(e,c),u=new C.Script(n,{filename:e,lineOffset:0,displayErrors:!0,cachedData:y,produceCachedData:!0});u.cachedDataProduced?this._cacheStore.set(e,c,u.cachedData):u.cachedDataRejected&&this._cacheStore.delete(e);var v=u.runInThisContext({filename:e,lineOffset:0,columnOffset:0,displayErrors:!0});return v}};function D(i){g(d.resolve(i),511)}function g(i,e){try{h.mkdirSync(i,e)}catch(t){if(t.code==="ENOENT")g(d.dirname(i)),g(i);else try{if(!h.statSync(i).isDirectory())throw t}catch{throw t}}}function F(i){let e={"\\":"zB",":":"zC","/":"zS","\0":"z0",z:"zZ"},t=/[\\:/\x00z]/g;return i.replace(t,s=>e[s])}function M(){return new C.Script('""',{produceCachedData:!0}).cachedDataProduced===!0}function B(){let i=process.env.V8_COMPILE_CACHE_CACHE_DIR;if(i)return i;let e=typeof process.getuid=="function"?"v8-compile-cache-"+process.getuid():"v8-compile-cache",t=process.arch,s=typeof process.versions.v8=="string"?process.versions.v8:typeof process.versions.chakracore=="string"?"chakracore-"+process.versions.chakracore:"node-"+process.version;return d.join(R.tmpdir(),e,t,s)}function L(){return require.main&&typeof require.main.filename=="string"?require.main.filename:process.cwd()}if(!process.env.DISABLE_V8_COMPILE_CACHE&&M()){let i=B(),e=L(),t=new m(i,e),s=new _;s.setCacheStore(t),s.install(),process.once("exit",()=>{t.isDirty()&&t.save(),s.uninstall()})}O.exports.__TEST__={FileSystemBlobStore:m,NativeCompileCache:_,mkdirpSync:D,slashEscape:F,supportsCachedData:M,getCacheDir:B,getMainName:L}});var o=require("electron"),H=S(k()),E=S(require("path"));function T(){let{width:i,height:e}=o.screen.getPrimaryDisplay().workAreaSize,t=new o.BrowserWindow({width:i,height:e,webPreferences:{nodeIntegration:!1,nodeIntegrationInWorker:!1,webSecurity:!1,contextIsolation:!1,devTools:!1,sandbox:!1,preload:E.default.join(__dirname,"preload.js"),partition:"persist:evio"},icon:"./icon.ico"});N(),t.webContents.on("before-input-event",(s,r)=>{r.key==="F5"&&(t.reload(),s.preventDefault()),r.key==="F6"&&(t.loadURL("https://ev.io/"),s.preventDefault()),r.key==="F7"&&(t.loadURL(o.clipboard.readText()),s.preventDefault()),r.key==="F8"&&(t.loadURL("https://ev.io/user/login/"),s.preventDefault()),r.key==="F9"&&o.app.quit(),r.key==="F11"&&(t.setFullScreen(!t.isFullScreen()),s.preventDefault())}),t.removeMenu(),t.loadURL("https://ev.io"),t.once("ready-to-show",()=>{t.show()}),t.on("close",s=>{s.preventDefault(),t.destroy()})}function N(){let i=["enable-accelerated-2d-canvas","disable-gpu-vsync","disable-software-rasterizer","disable-renderer-backgrounding","disable-software-compositing-fallback","disable-gpu-process-crash-limit","force-gpu-rasterization","disable-frame-rate-limit","disable-2d-canvas-clip-aa","enable-skia-graphite","disable-background-networking","enable-quic","disable-v8-idle-tasks","enable-future-v8-vm-features","no-sandbox","disable-backing-store-limit"];for(let e=0,t=i.length;e<t;e++)o.app.commandLine.appendSwitch(i[e]);o.app.commandLine.appendSwitch("use-angle","OpenGL"),o.app.commandLine.appendSwitch("high-dpi-support","1"),o.app.commandLine.appendSwitch("v8-cache-options","code"),o.app.commandLine.appendSwitch("canvas-msaa-sample-count","0"),o.app.commandLine.appendSwitch("ebgl-antialiasing-mode","none"),console.log("Flags applied")}o.app.on("ready",()=>{console.log("Client is ready to run"),T()});o.app.on("window-all-closed",()=>{process.platform!=="darwin"&&o.app.quit()});o.ipcMain.on("close",(i,e)=>{o.app.quit()});
