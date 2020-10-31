import { resolve } from 'path'

export default function (moduleOptions) {
  const options = { ...moduleOptions }

  if (!options.debug) {
    options.debug = false
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-plugin-vercel.js',
    options,
    ssr: false
  })
}

module.exports.meta = require('./package.json')
