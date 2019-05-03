# No-Sweat™ Webpack \w ESLint and Laravel Mix Setup

- Webpack: A highly configurable module bundler for modern JavaScript applications.

- ESLint is an open source JavaScript linting utility originally created by Nicholas C. Zakas in June 2013. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines. There are code linters for most programming languages, and compilers sometimes incorporate linting into the compilation process.

- Laravel Mix: An elegant wrapper around Webpack for the 80% use case.

## Laravel Mix - Best Practices

### Split your configurations into smaller files,

Move your `webpackConfig` to `webpack.config.js`. So that later we can use `webpack.config.js` with `ESLint` for resolving custom modules.

e.g. This will help you getting started:

'**webpack.config.js**

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
```

**webpack.mix.js**

```js
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

#### ESLint Pre-configured config

- **VueJS**: Follow [socheatsok78/eslint-config-altar](https://github.com/socheatsok78/eslint-config-altar#readme) for more detail
- **ReactJS**: Follow [wesbos/eslint-config-wesbos](https://github.com/wesbos/eslint-config-wesbos#readme) for more detail

#### More `@pp-spaces` custom Laravel Mix extension. [click here](https://github.com/search?q=topic%3Alaravel-mix+org%3App-spaces&type=Repositories)

## Service Worker & Web Worker related

- Service Worker, see [google/workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
- Web Worker, see [developit/workerize-loader](https://github.com/developit/workerize-loader)  
  For `Laravel Mix v4`, see [webpack-contrib/worker-loader](https://github.com/webpack-contrib/worker-loader) or [GoogleChromeLabs/worker-plugin](https://github.com/GoogleChromeLabs/worker-plugin)

#### Working \w `google/workbox-webpack-plugin`

If you have a project with large configurations, It's a good idea to split `google/workbox-webpack-plugin` to `workbox.config.js` as well.

## Downgrade `laravel-mix` from `v4` to `v3.0.0`

> Well, I like to use **Dynamic Import** but the latest `laravel-mix` compiler has a bug that broke everything. So reverting back to `laravel-mix@3.0.0` is the best choice.

Click here for [How-to downgrade Laravel Mix](docs/laravel-mix-downgrade.md)
