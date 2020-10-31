# nuxt-plugin-vercel

This plugin sends [Core Web Vitals](https://web.dev/vitals/) to Vercel Analytics.

## Install

`npm i nuxt-plugin-vercel --save-dev`

or

`yarn add nuxt-plugin-vercel --dev`

## Usage

Add `nuxt-vitals` to the `buildModules` section of `nuxt.config.js`.
The Vercel Analytics project ID will be automically added as an environment variable (`process.env.VERCEL_ANALYTICS_ID`) at build time.

```javascript
export default {
  buildModules: [
    [
      'nuxt-plugin-vercel',
      {
        // Prints metrics in the console when 1
        debug: 0
      }
    ]
  ]
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--save-dev` or `--dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

## Inspiration

- [nuxt-vitals](https://github.com/daliborgogic/nuxt-vitals)
