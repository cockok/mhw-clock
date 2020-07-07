module.exports = {
  publicPath: '/mhw-clock',
  configureWebpack: {
    output: {
      filename: 'js/mhw-clock.js',
      chunkFilename: 'js/chunk-vendors.js'
    }
  }
}