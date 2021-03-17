const staticCacheName = 'site-static-v5';
const dynamicCacheName = 'site-dynamic-v5';
const assets = [
    '/',
    'css/bootstrap.min.css',
    'css/style.css',
    'img/grey_wall.png',
    'img/logo-puskesmas-ori.png',
    'img/logo-puskesmas.png',
    'img/selfie-384.png',
    'img/selfie-96.png',
    'scripts/app.js',
    'scripts/auth.js',
    'scripts/bootstrap.min.js',
    'scripts/config.js',
    'scripts/html2pdf.min.js',
    'scripts/index.js',
    'scripts/jquery.min.js',
    'index.html',
    'akun.html',
    'daftar-akun.html',
    'daftar-presensi.html',
    'login.html',
    'fallback.html'
];


// install service worker
self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching shell assets');
            cache.addAll(assets);
            // return
        })
    )
});

// active event
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
});

// fetch event
self.addEventListener('fetch', evt => {
    console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            console.log(cacheRes);
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                });
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('fallback.html');
            }
        })
    );
});