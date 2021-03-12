// install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been installed');
});

// active event
self.addEventListener('activate', evt => {
    console.log('service worker has been activated');
});