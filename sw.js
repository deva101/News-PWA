const staticAssetss = [
    './',
    './css/style.css',
    './js/app.js',
    './fallback.json',
    './images/fetch-dog.jpg'
];

self.addEventListener('install',async event =>{
    const cache = await caches.open('news-static');
    cache.addAll(staticAssetss);

    console.log("Installed!");
});

self.addEventListener('fetch',event =>{
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin){
        event.respondWith(cacheFirst(req));
        // console.log("Cache First");
    }else{
        event.respondWith(networkFirst(req));
        // console.log("Network First");
    }

});

async function cacheFirst(req) {
    const cachedRes = await caches.match(req);

    return cachedRes || fetch(req);
}

async function networkFirst(req) {
    const dynamicCache = await caches.open('news-dynamic');

    try{
        const res = await fetch(req);
        dynamicCache.put(req,res.clone());
        return res;
    }catch (e) {
        const cachedResults = await dynamicCache.match(req);

        return cachedResults || await caches.match('./fallback.json');
    }

}
