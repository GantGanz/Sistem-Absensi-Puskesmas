const staticCacheName = 'site-static';
const assets = [
    '/',
    'css/bootstrap.min.css',
    'css/style.css',
    'img/grey_wall.png',
    'img/logo-puskesmas-ori.png',
    'img/logo-puskesmas.png',
    'img/selfie-384.png',
    'scripts/app.js',
    'scripts/auth.js',
    'scripts/bootstrap.min.js',
    'scripts/config.js',
    'scripts/html2pdf.min.js',
    'scripts/index.js',
    'scripts/jquery.min.js',
    'akun.html',
    'daftar-akun.html',
    'daftar-presensi.html',
    'index.html',
    'login.html',
];

// install service worker
self.addEventListener('install', evt => {
    // console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
            // return
        })
    )
});

// active event
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});