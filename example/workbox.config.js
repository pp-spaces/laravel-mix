/**
 * Workbox Webpack Plugin Configuration
 */
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = [
    new GenerateSW({
        // Default workbox will be loaded from CDN
        importWorkboxFrom: 'cdn',

        // Import Custom Workbox Script
        importScripts: ['/workbox.mix.js'],

        // Should skip over the waiting lifecycle stage
        skipWaiting: true,

        // Start controlling any existing clients as soon as it activates.
        clientsClaim: true,

        // Identify an delete any precaches created by older, incompatible versions
        cleanupOutdatedCaches: true,

        // Exclude images from the precache
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],

        // App Shell HTML
        navigateFallback: '/home',

        // Set up an appropriate reesponse strategy
        // that will match navigation requests,
        // and make use of the preloaded response.
        // navigationPreload: true,

        // Define runtime caching rules.
        runtimeCaching: [
            // {
            //     urlPattern: ({ event }) => event.request.mode === 'navigate',
            //     handler: 'NetworkFirst',
            //     options: {
            //         cacheName: 'cached-navigations',
            //     },
            // },
            {
                urlPattern: /\.(?:js)/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-js',
                },
            },
            {
                urlPattern: /\.(?:css)/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-css',
                },
            },
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-image',
                    expiration: {
                        maxEntries: 10,
                    },
                },
            },
            {
                urlPattern: /api/,
                handler: 'NetworkFirst',
                options: {
                    networkTimeoutSeconds: 10,
                    cacheName: 'cached-api',
                    expiration: {
                        maxEntries: 30,
                        maxAgeSeconds: 60,
                    },
                    backgroundSync: {
                        name: 'api-queue-db',
                        options: {
                            maxRetentionTime: 60 * 60,
                        },
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                        headers: { 'Content-Type': 'application/json' },
                    },
                },
            },
            {
                urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-font',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                    expiration: {
                        maxEntries: 10,
                    },
                },
            },
        ],
    }),
];
