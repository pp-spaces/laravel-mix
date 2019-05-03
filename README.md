# No-Sweat™ Webpack \w ESLint and Laravel Mix Setup

## Laravel Mix - Best Practices

- Split your configurations into smaller files,  
  e.g. Move your `webpackConfig` to `webpack.config.js`. Later we can use `webpack.config.js` with `ESLint` for resolving custom modules
- Setup `ESLint` cli and `eslint-loader` for webpack  
  All ESLint rules & configurations will be store in `.eslintrc.js` or `.eslintrc`,  
  I recommended to use `.eslintrc.js`

## ESLint Pre-configured

- **VueJS**: Follow [socheatsok78/eslint-config-altar](https://github.com/socheatsok78/eslint-config-altar#readme) for more detail
- **ReactJS**: Follow [wesbos/eslint-config-wesbos](https://github.com/wesbos/eslint-config-wesbos#readme) for more detail

#### More `@pp-spaces` custom Laravel Mix extension. [click here](https://github.com/search?q=topic%3Alaravel-mix+org%3App-spaces&type=Repositories)

## Downgrade laravel-mix from v4 to v3.0.0

> Well, I like to use **Dynamic Import** but the latest `laravel-mix` compiler has a bug that broke everything. So reverting back to `laravel-mix@3.0.0` is the best choice.

Click here for [How-to Downgrade](docs/laravel-mix-downgrade.md)
