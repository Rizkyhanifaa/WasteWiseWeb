// sw.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { BASE_URL } from './config';

// ===== Precaching =====
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

// ===== Cache Names =====
const CACHE_NAME_FONTS = 'google-fonts';
const CACHE_NAME_FONT_AWESOME = 'fontawesome';
const CACHE_NAME_AVATARS = 'avatars-api';
const CACHE_NAME_API = 'story-api';
const CACHE_NAME_IMAGES = 'story-api-images';
const CACHE_NAME_MAPTILER = 'maptiler-api';

// ===== Cleanup Old Caches =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => ![
            CACHE_NAME_FONTS,
            CACHE_NAME_FONT_AWESOME,
            CACHE_NAME_AVATARS,
            CACHE_NAME_API,
            CACHE_NAME_IMAGES,
            CACHE_NAME_MAPTILER
          ].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// ===== Runtime Caching Strategies =====

// Google Fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({ cacheName: CACHE_NAME_FONTS })
);

// FontAwesome
registerRoute(
  ({ url }) => url.origin === 'https://cdnjs.cloudflare.com' || url.origin.includes('fontawesome'),
  new CacheFirst({ cacheName: CACHE_NAME_FONT_AWESOME })
);

// Avatars (ui-avatars.com)
registerRoute(
  ({ url }) => url.origin === 'https://ui-avatars.com',
  new CacheFirst({
    cacheName: CACHE_NAME_AVATARS,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// Story API (JSON Data)
registerRoute(
  ({ url }) => new URL(BASE_URL).origin === url.origin,
  new NetworkFirst({
    cacheName: CACHE_NAME_API,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// Story API Images
registerRoute(
  ({ url, request }) => {
    const baseUrl = new URL(BASE_URL);
    return url.origin === baseUrl.origin && request.destination === 'image';
  },
  new StaleWhileRevalidate({
    cacheName: CACHE_NAME_IMAGES,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// Maptiler API
registerRoute(
  ({ url }) => url.origin.includes('maptiler'),
  new CacheFirst({
    cacheName: CACHE_NAME_MAPTILER,
    plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
  })
);

// ===== Push Notification Handler =====
self.addEventListener('push', (event) => {
  console.log('Service worker received a push notification.');

  event.waitUntil(
    (async () => {
      try {
        const data = event.data ? await event.data.json() : {};
        const title = data.title || 'Story App Notification';
        const options = {
          body: data.body || 'You have a new notification.',
          icon: 'images/icons/icon-x144.png',
          badge: 'images/icons/icon-x48.png',
        };

        if (Notification.permission === 'granted') {
          await self.registration.showNotification(title, options);
        } else {
          console.warn('Notification permission is not granted.');
        }
      } catch (error) {
        console.error('Error in push notification handler:', error);
      }
    })()
  );
});
