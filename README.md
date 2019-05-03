# No-Sweat™ Webpack \w ESLint and Laravel Mix Setup

## Laravel Mix - Best Practices

### Split your configurations into smaller files,

Move your `webpackConfig` to `webpack.config.js`. So that later we can use `webpack.config.js` with `ESLint` for resolving custom modules.

e.g. `webpack.config.js` \w `webpack.mix.js`

```js
// webpack.config.js
module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": `${__dirname}/resources/js`
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules|vendor/,
        loader: "eslint-loader",
        options: {}
      }
    ]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "js/[name]/[chunkhash].js",
    path: `${__dirname}/public`,
    publicPath: "/"
  },
  plugins: [
    // Your Webpack Plugins
  ]
};

// webpack.mix.js
const mix = require("laravel-mix");
const webpackConfig = require("webpack.config");

mix.webpackConfig(webpackConfig);
```

### Setup `ESLint` cli and `eslint-loader` for webpack

All ESLint rules & configurations will be store in `.eslintrc.js` or `.eslintrc`,  
I recommended to use `.eslintrc.js`

```js
// .eslintrc.js

module.exports = {
    "extends": ["altar"], // github:socheatsok78/eslint-config-altar
    "rules": {
        ...
    },
    "settings": {
        "import/resolver": {
            "webpack": "webpack.config.js" // The Webpack config
        }
    }
}
```

## ESLint Pre-configured

- **VueJS**: Follow [socheatsok78/eslint-config-altar](https://github.com/socheatsok78/eslint-config-altar#readme) for more detail
- **ReactJS**: Follow [wesbos/eslint-config-wesbos](https://github.com/wesbos/eslint-config-wesbos#readme) for more detail

#### More `@pp-spaces` custom Laravel Mix extension. [click here](https://github.com/search?q=topic%3Alaravel-mix+org%3App-spaces&type=Repositories)

## Service Worker & Web Worker related

- Service Worker, see [google/workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
- Web Worker, see [developit/workerize-loader](https://github.com/developit/workerize-loader) \w `Laravel Mix v4`, see [webpack-contrib/worker-loader](https://github.com/webpack-contrib/worker-loader)

#### Working \w `google/workbox-webpack-plugin`

If you have a project with large `workbox` configurations, It's a good idea to split `google/workbox-webpack-plugin` to `workbox.config.js` as well.

## Downgrade laravel-mix from v4 to v3.0.0

> Well, I like to use **Dynamic Import** but the latest `laravel-mix` compiler has a bug that broke everything. So reverting back to `laravel-mix@3.0.0` is the best choice.

Click here for [How-to Downgrade](docs/laravel-mix-downgrade.md)
