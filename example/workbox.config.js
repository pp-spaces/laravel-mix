/**
 * Workbox Webpack Plugin Configuration
 */
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = [
    new GenerateSW({
        // Default workbox will be loaded from CDN
        importWorkboxFrom: 'cdn',

        // Import Custom Workbox Script
        // Create workbox.mix.js in your public directory before enable
        // importScripts: ['/workbox.mix.js'],

        // Should skip over the waiting lifecycle stage
        skipWaiting: true,

        // Start controlling any existing clients as soon as it activates.
        clientsClaim: true,

        // Identify an delete any precaches created by older, incompatible versions
        cleanupOutdatedCaches: true,

        // Exclude images from the precache
        exclude: [/\.(?:png|gif|jpg|jpeg|svg|webp|tif)$/],

        // App Shell HTML for Single Page Application
        navigateFallback: '/home',

        // Set up an appropriate reesponse strategy
        // that will match navigation requests,
        // and make use of the preloaded response.
        // Not recommended for Single Page Application

        // navigationPreload: true,
        
        // Define runtime caching rules.
        runtimeCaching: [
            // With navigationPreload === true
            // Uncommnet the code below
            // {
            //     urlPattern: ({ event }) => event.request.mode === 'navigate',
            //     handler: 'NetworkFirst',
            //     options: {
            //         cacheName: 'cached-navigations',
            //     },
            // },

            // Dynamic Assets
            {
                urlPattern: /\.(?:js)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-js',
                },
            },
            {
                urlPattern: /\.(?:css)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-css',
                },
            },
            {
                urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp|tif)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'cached-image',
                    expiration: {
                        maxEntries: 10,
                    },
                },
            },

            // API Routing
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

            // Google Fonts
            {
                urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'google-fonts-stylesheets',
                }
            },
            {
                urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'google-fonts-webfonts',
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                    expiration: {
                        maxAgeSeconds: 60 * 60 * 24 * 365,
                    },
                },
            },
        ],
    }),
];
