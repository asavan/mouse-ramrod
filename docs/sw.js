(()=>{const n="cache-only-0.0.1";function t(t){return caches.open(n).then((function(n){return n.match(t,{ignoreSearch:!0}).then((function(n){return n||Promise.reject("request-not-in-cache")}))}))}function e(){const t=[{'revision':'746b3ea68ca531277bba09ed8ae4e8ab','url':'images/antimouse1.jpg'},{'revision':'6fa38ee8dd7b34c23bd45dc364627d1d','url':'images/antimouse1.png'},{'revision':'d04c694719724a8bd8fc83d3f7e383c7','url':'images/antimouse2.jpg'},{'revision':'15c299e443cfe5f6db3cef1996517fd4','url':'images/antimouse3.jpg'},{'revision':'21f31d8346ed684d853df2f7a5eb084e','url':'images/antimouse4.jpg'},{'revision':'9bf51c21b6a47a063b85b0ac797be21c','url':'images/antimouse5.png'},{'revision':'0fbe0d3cf2625e9d0337b0092bb6334a','url':'images/antimouse6.jpg'},{'revision':'4707a7cb7c3ec8a10c07953dbc658f9d','url':'images/antimouse7.jpg'},{'revision':'5d77b83c74cab2d1dad09240ec5ab310','url':'images/antimouse8.jpg'},{'revision':'f8f1316ffc1e3ee1290b9a2df4e1e7f8','url':'images/mouse.svg'},{'revision':null,'url':'main.a22e0013de86055f021d.min.js'},{'revision':null,'url':'main.b4745bd2e52c2a2b594b.min.css'},{'revision':'4e6964fc553becbb215d53e265c931b6','url':'manifest.json'},{'revision':'db7fdc7addf683fa132822b2c07ae7c6','url':'rules.html'}].map((n=>n.url));return caches.open(n).then((function(n){return n.addAll(["./",...t])}))}self.addEventListener("install",(function(n){n.waitUntil(e())})),self.addEventListener("install",(function(n){n.waitUntil(e().then((function(){return self.skipWaiting()})))})),self.addEventListener("fetch",(function(n){var e;n.respondWith((e=n.request,fetch(e).then((function(n){return n.ok?n:t(e)})).catch((function(){return t(e)}))))})),self.addEventListener("activate",(function(t){t.waitUntil(caches.keys().then((function(t){return Promise.all(t.map((function(t){if(t!==n)return caches.delete(t)})))})).then((function(){return self.clients.claim()})))}))})();