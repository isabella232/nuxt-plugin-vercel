# nuxt-plugin-vercel

This plugin sends [Core Web Vitals](https://web.dev/vitals/) to Vercel Analytics.

## Install

`npm i nuxt-plugin-vercel`

or

`yarn add nuxt-plugin-vercel`

## Usage

Add `nuxt-vitals` to the `modules` section of `nuxt.config.js`.
The Vercel Analytics project ID will be automically added as an environment variable (`process.env.VERCEL_ANALYTICS_ID`) at build time.

```javascript
modules: [
  [
    'nuxt-plugin-vercel',
    {
      // Prints metrics in the console when 1
      debug: 0
    }
  ]
]
```

## Inspiration

- [nuxt-vitals](https://github.com/daliborgogic/nuxt-vitals)
