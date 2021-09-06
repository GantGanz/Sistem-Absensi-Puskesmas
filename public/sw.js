const staticCacheName = 'site-static-v25';
const dynamicCacheName = 'site-dynamic-v25';
const assets = [
    '/',
    'css/bootstrap.min.css',
    'css/style.css',
    'img/grey_wall.png',
    'img/logo-puskesmas-ori.png',
    'img/logo-puskesmas.png',
    'img/selfie-384.png',
    'img/selfie-96.png',
    'img/izin.png',
    'scripts/app.js',
    'scripts/auth.js',
    'scripts/bootstrap.min.js',
    'scripts/config.js',
    'scripts/html2pdf.min.js',
    'scripts/index.js',
    'scripts/jquery.min.js',
    'scripts/loader.js',
    'manifest.json',
    'index.html',
    'akun.html',
    'daftar-presensi.html',
    'hitung-jaspel.html',
    'perizinan.html',
    'daftar-akun.html',
    'login.html',
    'fallback.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}

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
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 30);
                        return fetchRes;
                    });
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('fallback.html');
                }
            })
        );
    }
});
