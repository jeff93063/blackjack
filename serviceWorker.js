const staticCacheName = "blackjack-static-v1";
const assets = [
	"/blackjack/",
	"/blackjack/index.html",
	"/blackjack/blackjack.css",
	"/blackjack/blackjack.js"
];

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticCacheName).then(cache => {
			cache.addAll(assets);
		})
	);
});

self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys =>{
			//console.log(keys);
			return Promise.all(keys
				.filter(key => key !== staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	);
});

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		})
	);
});
