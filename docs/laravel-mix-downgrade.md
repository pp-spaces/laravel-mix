# Downgrade `laravel-mix` from `v4` to `v3.0.0`

- I recommended to apply this patch on newly created project.

## Why I created this?

> Well, I like to use **Dynamic Import** but the latest `laravel-mix` compiler has a bug that broke everything. So reverting back to `laravel-mix@3.0.0` is the best choice.

## What's the different?

```diff
"devDependencies": {
+   "@babel/core": "^7.3.4",
+   "@babel/plugin-proposal-object-rest-spread": "^7.3.4",
+   "@babel/plugin-syntax-dynamic-import": "^7.2.0",
+   "@babel/polyfill": "^7.2.5",
    "axios": "^0.18",
    "bootstrap": "^4.0.0",
    "cross-env": "^5.1",
+   "imagemin": "^6.1.0",
    "jquery": "^3.2",
-   "laravel-mix": "^4.0.7",
+   "laravel-mix": "^3.0.0",
    "lodash": "^4.17.5",
    "popper.js": "^1.12",
-   "resolve-url-loader": "^2.3.1",
-   "sass": "^1.15.2",
-   "sass-loader": "^7.1.0",
    "vue": "^2.5.17"
}
```

#### Applying Patch

```sh
curl https://github.com/pp-spaces/laravel-mix/releases/latest/latest/download/package.json.diff | git apply -
```

#### Revert Patch

```sh
curl https://github.com/pp-spaces/laravel-mix/releases/latest/download/package.json.diff | git apply -R -
```

Or specify `laravel` version:

```sh
curl https://github.com/pp-spaces/laravel-mix/releases/download/v5.8.0/package.json.diff | git apply -
```
