if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const c={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return c;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-15dd0bab"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"favicon.png",revision:"a3675753e4936991957e41ba137756a4"},{url:"main.0fcd9258ac2ef387a7a4.js",revision:null},{url:"main.0fcd9258ac2ef387a7a4.js.map",revision:"64ef61221e4418eec4a4a5f790be764a"},{url:"main.679bb996c9a7c712f636.css",revision:null},{url:"main.679bb996c9a7c712f636.css.map",revision:"c6a2923ca8981fb0f38f388d18c3d2da"}],{})}));
//# sourceMappingURL=service-worker.js.map
