const mix = require('laravel-mix');
const path = require('path');
const replace = require('replace-in-file');

/**
 * Other Configurations
 */
const webpackConfig = require('./webpack.config');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .extract(['vue', 'lodash', 'jquery', 'popper.js', 'bootstrap'])
    .webpackConfig(webpackConfig)
    .then(config => {
        /**
         * Fix url path issues on generated Service Worker
         * NOTE: This is a workaround
         */
        replace.sync({
            files: path.normalize(`${__dirname}/public/precache-manifest.*.js`),
            from: /"\/\//gu,
            to: '"/',
        });
    });
