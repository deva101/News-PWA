const staticAssetss = [
    '/',
    '../css/style.css',
    '/js/fallback.json',
    '/js/view.js',
    '../images/fetch-dog.jpg'
];

// ################# Install #################
self.addEventListener('install',async event =>{
    const cache = await caches.open('news-static');
    cache.addAll(staticAssetss);

    console.log("Installed!");
    // self.skipWaiting();
});

// ################# Activate #################
self.addEventListener('activate', (event) => {
    console.log('Event: Activate');

    //Remove old and unwanted caches
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== "news-static") {     //cacheName = 'cache-v1'
                        return caches.delete(cache);    //Deleting the cache
                    }
                })
            );
        })
    );
});


//

// ################# Fetch #################
self.addEventListener('fetch',event =>{
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.origin){
        event.respondWith(cacheFirst(req));
        // console.log("Cache First");
    }else{
        event.respondWith(networkFirst(req));
        console.log("Network First");
    }

    // console.log("Fetch Request");
});

async function cacheFirst(req) {
    const cachedRes = await caches.match(req);

    return cachedRes || fetch(req);
}

async function networkFirst(req) {
    // Make Dynamic content
    const dynamicCache = await caches.open('news-dynamic');

    try{
        // If Online...Send Network Response
        const res = await fetch(req);
        dynamicCache.put(req,res.clone());
        return res;
    }catch (e) {
        // If Offline...Send Cached result or fallback.json file
        console.log("fallback/cache--servise-worker");
        const cachedResults = await dynamicCache.match(req);
        if (cachedResults){
            console.info("Dynamic Cache");
            return cachedResults;
        }else{
            console.info("fallback.json");
            return await caches.match('/js/fallback.json');
        }

    }

}

