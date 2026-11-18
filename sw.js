const CACHE="mykuraflow-shell-v5";
const SOURCES=[
"data/front-matter-pages-001-008.json",
"data/part-01/lesson-01-pages-009-012.json",
"data/part-01/lesson-02-pages-013-018.json",
"data/part-01/lesson-03-pages-019-028.json",
"data/part-01/lesson-04-pages-029-038.json",
"data/part-01/lesson-05-corrected-printed-pages-039-048.json",
"data/part-01/lesson-05-printed-page-049.json",
"data/part-01/lesson-05-corrected-printed-pages-050-059.json",
"data/part-02/lesson-01-pages-054-068.json",
"data/part-02/lesson-02-pages-069-078.json",
"data/part-02/lesson-03-pages-079-088.json",
"data/part-03/lesson-01-pages-089-098.json",
"data/part-03/lesson-02-pages-099-108.json",
"data/part-04/lesson-01-pages-109-118.json",
"data/part-04/lesson-02-pages-119-123.json"
];
const CORE=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest",...SOURCES.map(x=>"./"+x)];
self.addEventListener("install",event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const path of CORE){try{await cache.add(path)}catch(error){console.warn("Cache skipped:",path,error)}}await self.skipWaiting()})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));await self.clients.claim()})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith((async()=>{const hit=await caches.match(event.request);if(hit)return hit;try{const response=await fetch(event.request);if(response.ok&&(event.request.url.includes("/images/")||event.request.url.endsWith(".json"))){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response}catch(error){if(event.request.mode==="navigate")return caches.match("./index.html");return new Response("",{status:504,statusText:"Offline resource unavailable"})}})())});
